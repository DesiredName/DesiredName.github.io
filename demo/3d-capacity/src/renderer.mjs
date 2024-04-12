export class RENDERER_EVENTS {
    static INIT = 'init';
    static RENDER = 'render';
    static CAMERA_ROTATE = 'camera_rotate';
    static CAMERA_PAN = 'camera_pan';
    static CAMERA_MOVE = 'camera_move';
    static CAMERA_SLICE = 'camera_slice';
    static CAMERA_SHOW_WATER = 'camera_show_water';
}

let canvas = null;
let ctx = null;
let heightmap = [];
let waterlevel = [];

const cell_size = 32;
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
        y: 240,
    },
    rotation: {
        degrees: -35,
        sin: Math.sin(translate_angel(-35)),
        cos: Math.cos(translate_angel(-35)),
    },
    slice: 0,
    render_water: true,
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

        case RENDERER_EVENTS.CAMERA_ROTATE:
            const angel = camera.rotation.degrees - e.data.angle;
            camera.rotation = {
                degrees: angel,
                sin: Math.sin(translate_angel(angel)),
                cos: Math.cos(translate_angel(angel)),
            };
            break;

        case RENDERER_EVENTS.CAMERA_MOVE:
            camera.position.x += e.data.move.x;
            camera.position.y += e.data.move.y;
            break;

        case RENDERER_EVENTS.CAMERA_SLICE:
            camera.slice = e.data.slice;
            break;

        case RENDERER_EVENTS.CAMERA_SHOW_WATER:
            camera.render_water = e.data.show_water === true;
            break;

        case RENDERER_EVENTS.RENDER:
            heightmap = e.data.heightmap;
            waterlevel = e.data.waterlevel;
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
    draw_blocks(h, w);
}

function draw_grid(h, w) {
    ctx.strokeStyle = 'yellow';

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            draw_cell(x, y);
        }
    }
}

function draw_blocks(h, w) {
    for (let x = w - 1; x >= 0; x--) {
        for (let y = 0; y < h; y++) {
            const zh = heightmap[y][x] ?? 0;
            const wh = waterlevel[y][x] ?? 0;

            if ((zh === 0 && wh === 0) || x < camera.slice) {
                draw_cell(x, y);
            } else if (false === camera.render_water || zh >= wh) {
                draw_block(x, y, zh, 'green', 'gray', 'lightgrey');
            } else {
                draw_block(x, y, wh, 'blue', 'darkblue', 'lightblue');
                draw_left_side(x, y, zh, 'gray');
            }
        }
    }
}

function draw_block(x, y, z, cap_color, left_side_color, front_side_color) {
    ctx.strokeStyle = 'darkgrey';

    draw_cap(x, y, z, cap_color);

    if (z !== 0) {
        draw_left_side(x, y, z, left_side_color);
        draw_front_side(x, y, z, front_side_color);
    }
}

function draw_cell(x, y) {
    ctx.strokeStyle = 'goldenrod';
    const p = translate_matrix(x, y, 0);

    ctx.beginPath();
    ctx.moveTo(...p);
    ctx.moveTo(...translate_matrix(x, y, 0));
    ctx.lineTo(...translate_matrix(x + 1, y, 0));
    ctx.lineTo(...translate_matrix(x + 1, y + 1, 0));
    ctx.lineTo(...translate_matrix(x, y + 1, 0));
    ctx.closePath();
    ctx.stroke();
}

function draw_cap(x, y, z, cap_color) {
    ctx.fillStyle = cap_color;

    ctx.beginPath();
    ctx.moveTo(...translate_matrix(x, y, z));
    ctx.lineTo(...translate_matrix(x + 1, y, z));
    ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
    ctx.lineTo(...translate_matrix(x, y + 1, z));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function draw_left_side(x, y, z, left_side_color) {
    ctx.fillStyle = left_side_color;

    ctx.beginPath();
    ctx.moveTo(...translate_matrix(x, y, z));
    ctx.lineTo(...translate_matrix(x, y, 0));
    ctx.lineTo(...translate_matrix(x, y + 1, 0));
    ctx.lineTo(...translate_matrix(x, y + 1, z));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function draw_front_side(x, y, z, front_side_color) {
    ctx.fillStyle = front_side_color;

    ctx.beginPath();
    ctx.moveTo(...translate_matrix(x, y + 1, z));
    ctx.lineTo(...translate_matrix(x, y + 1, 0));
    ctx.lineTo(...translate_matrix(x + 1, y + 1, 0));
    ctx.lineTo(...translate_matrix(x + 1, y + 1, z));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
