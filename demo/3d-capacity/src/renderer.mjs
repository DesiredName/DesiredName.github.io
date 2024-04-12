export class RENDERER_EVENTS {
    static INIT = 'init';
    static RENDER = 'render';
    static CAMERA_ROTATE = 'camera_rotate';
    static CAMERA_PAN = 'camera_pan';
    static CAMERA_MOVE = 'camera_move';
}

let canvas = null;
let ctx = null;
let heightmap = [];

const cell_size = 32;

const angel = -35;
const camera = {
    min_scale: 0.5,
    max_scale: 4,
    skew: {
        x: 0.45,
        y: 0.82,
    },
    pan: 1,
    position: {
        x: 45,
        y: 230,
    },
    rotation: {
        degrees: angel,
        sin: Math.sin(translate_angel(angel)),
        cos: Math.cos(translate_angel(angel)),
    },
};

addEventListener('message', (e) => {
    const { name } = e.data;

    switch (name) {
        case RENDERER_EVENTS.INIT:
            canvas = e.data.offscreen;
            ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            break;

        case RENDERER_EVENTS.CAMERA_PAN:
            camera.pan = Math.max(
                camera.min_scale,
                Math.min(camera.max_scale, camera.pan + e.data.pan),
            );
            break;

        case RENDERER_EVENTS.CAMERA_MOVE:
            camera.position.x += e.data.translation.x;
            camera.position.y += e.data.translation.y;
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

function translate_angel(degrees) {
    return (degrees * Math.PI) / 180;
}

function translate_matrix(x, y, z) {
    const rx = camera.rotation.cos * x - camera.rotation.sin * y;
    const ry = camera.rotation.sin * x + camera.rotation.cos * y;

    return [
        (rx + camera.skew.x * ry) * camera.pan * cell_size + camera.position.x,
        (camera.skew.y * ry - z) * camera.pan * cell_size + camera.position.y,
    ].map((v) => Math.floor(v));
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
            ctx.strokeStyle = 'darkgrey';

            ctx.beginPath();
            ctx.moveTo(...translate_matrix(x, y, z));
            ctx.lineTo(...translate_matrix(x + 1, y, z));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
            ctx.lineTo(...translate_matrix(x, y + 1, z));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

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
            ctx.stroke();

            ctx.fillStyle = 'lightgray';

            ctx.beginPath();
            ctx.moveTo(...translate_matrix(x, y + 1, z));
            ctx.lineTo(...translate_matrix(x, y + 1, 0));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, 0));
            ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
}
