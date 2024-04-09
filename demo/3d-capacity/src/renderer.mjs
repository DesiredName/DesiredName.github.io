export class RENDERER_EVENTS {
    static INIT = 'init';
    static RENDER = 'render';
    static CHANGE_SCALE = 'change_scale';
    static SET_TRANSLATION = 'set_translation';
    static FIX_TRANSLATION = 'fix_translation';
}

let canvas = null;
let ctx = null;

const cell_size = 32;
const min_scale = 0.5;
const max_scale = 4;

const skew = {
    x: 0.8,
    y: 0.5,
};
let scale_interactive = 1;
let translate_base = {
    x: 0,
    y: 250,
};
let translate_interactive = {
    x: 0,
    y: 0,
};
let heightmap = [];

addEventListener('message', (e) => {
    const { name } = e.data;

    switch (name) {
        case RENDERER_EVENTS.INIT:
            canvas = e.data.offscreen;
            ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            break;

        case RENDERER_EVENTS.CHANGE_SCALE:
            scale_interactive = Math.max(
                min_scale,
                Math.min(max_scale, scale_interactive + e.data.delta),
            );
            break;

        case RENDERER_EVENTS.SET_TRANSLATION:
            translate_interactive = e.data.translation;
            break;

        case RENDERER_EVENTS.FIX_TRANSLATION:
            translate_interactive = {
                x: 0,
                y: 0,
            };
            translate_base = {
                x: translate_base.x + e.data.translation.x,
                y: translate_base.y + e.data.translation.y,
            };
            break;

        case RENDERER_EVENTS.RENDER:
            heightmap = e.data.heightmap;
            break;
    }

    clear();

    if (name != RENDERER_EVENTS.INIT) {
        draw();
    }
});

function translate_matrix(x, y, z) {
    return [
        (x + skew.x * y) * scale_interactive * cell_size +
            translate_base.x +
            translate_interactive.x,
        (skew.y * y - z) * scale_interactive * cell_size +
            translate_base.y +
            translate_interactive.y,
    ];
}

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    const h = heightmap.length;
    const w = heightmap[0].length;

    draw_grid(h, w);
    draw_blocks(h, w);
}

function draw_grid(h, w) {
    ctx.strokeStyle = 'yellow';
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const p = translate_matrix(x, y, 0);
            ctx.beginPath();
            ctx.moveTo(...p);
            ctx.lineTo(...translate_matrix(x + 1, y, 0));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, 0));
            ctx.lineTo(...translate_matrix(x, y + 1, 0));
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function draw_blocks(h, w) {
    for (let x = w - 1; x >= 0; x--) {
        for (let y = 0; y < h; y++) {
            const z = heightmap[y][x];

            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.moveTo(...translate_matrix(x, y, z));
            ctx.lineTo(...translate_matrix(x + 1, y, z));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
            ctx.lineTo(...translate_matrix(x, y + 1, z));
            ctx.closePath();
            ctx.fill();

            if (z === 0) {
                continue;
            }

            ctx.fillStyle = 'gray';

            ctx.beginPath();
            ctx.moveTo(...translate_matrix(x, y, z));
            ctx.lineTo(...translate_matrix(x, y, 0));
            ctx.lineTo(...translate_matrix(x, y + 1, 0));
            ctx.lineTo(...translate_matrix(x, y + 1, z));
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'lightgray';

            ctx.beginPath();
            ctx.moveTo(...translate_matrix(x, y + 1, z));
            ctx.lineTo(...translate_matrix(x, y + 1, 0));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, 0));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
            ctx.closePath();
            ctx.fill();
        }
    }
}
