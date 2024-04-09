export class RENDERER_EVENTS {
    static INIT = 'init';
    static RENDER = 'render';
    static CAMERA_PAN = 'camera_scale';
    static CAMERA_MOVE = 'camera_move';
}

let canvas = null;
let ctx = null;
let heightmap = [];

const camera = {
    MIN_SCALE: 1,
    MAX_SCALE: 40,

    position: {
        x: 1,
        y: -1,
        z: 3,
    },
    rotation: {
        x: 65,
        y: 0,
        z: 0,
    },
    scale: 40,
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
            camera.position.z = camera.position.z + e.data.pan;
            break;

        case RENDERER_EVENTS.CAMERA_MOVE:
            camera.position.x = camera.position.x + e.data.translation.x;
            camera.position.y = camera.position.y + e.data.translation.y;
            break;

        case RENDERER_EVENTS.RENDER:
            heightmap = e.data.heightmap;
            break;
    }

    clear();

    if (name != RENDERER_EVENTS.INIT) {
        console.dir(camera);
        draw_dots();
        draw();
    }
});

function translate_angle(degrees) {
    return (degrees * Math.PI) / 180;
}

function translate_matrix() {
    const display = [160, 160, camera.scale];

    const ax = translate_angle(camera.rotation.x);
    const ay = translate_angle(camera.rotation.y);
    const az = translate_angle(camera.rotation.z);

    const cx = Math.cos(ax);
    const cy = Math.cos(ay);
    const cz = Math.cos(az);
    const sx = Math.sin(ax);
    const sy = Math.sin(ay);
    const sz = Math.sin(az);

    return (x, y, z) => {
        const X = x - camera.position.x;
        const Y = y - camera.position.y;
        const Z = z - camera.position.z;
        const dx = cy * (sz * Y + cz * X) - sy * Z;
        const dy =
            sx * (cy * Z + sy * (sz * Y + cz * X)) + cx * (cz * Y - sz * X);
        const dz =
            cx * (cy * Z + sy * (sz * Y + cz * X)) - sx * (cz * Y - sz * X);

        return [
            (display[2] / dz) * dx + display[0],
            (display[2] / dz) * dy + display[1],
        ];
    };
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

function draw_dots() {
    const t = translate_matrix();
    let p;

    ctx.strokeStyle = 'red';
    p = t(0, 0, 0);
    ctx.beginPath();
    ctx.ellipse(...p, 10, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeText(p, ...p);

    ctx.strokeStyle = 'green';
    p = t(1, 0, 0);
    ctx.beginPath();
    ctx.ellipse(...p, 10, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeText(p, ...p);

    ctx.strokeStyle = 'blue';
    p = t(1, 1, 0);
    ctx.beginPath();
    ctx.ellipse(...p, 10, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeText(p, ...p);

    ctx.strokeStyle = 'magenta';
    p = t(0, 1, 0);
    ctx.beginPath();
    ctx.ellipse(...p, 10, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeText(p, ...p);
}

function draw_grid(h, w) {
    ctx.strokeStyle = 'yellow';

    const t = translate_matrix();

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const p = t(x, y, 0);
            ctx.beginPath();
            ctx.moveTo(...p);
            ctx.lineTo(...t(x + 1, y, 0));
            ctx.lineTo(...t(x + 1, y + 1, 0));
            ctx.lineTo(...t(x, y + 1, 0));
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function draw_blocks(h, w) {
    const t = translate_matrix();

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const z = heightmap[y][x];

            // if (z !== 0) {
            //     ctx.fillStyle = 'gray';

            //     ctx.beginPath();
            //     ctx.moveTo(...t(x, y, z));
            //     ctx.lineTo(...t(x + 1, y, z));
            //     ctx.lineTo(...t(x + 1, y, heightmap[y][x + 1]));
            //     ctx.lineTo(...t(x, y, heightmap[y][x]));
            //     ctx.closePath();
            //     ctx.fill();
            // }

            ctx.fillStyle = 'green';

            ctx.beginPath();
            ctx.moveTo(...t(x, y, z));
            ctx.lineTo(...t(x + 1, y, z));
            ctx.lineTo(...t(x + 1, y + 1, z));
            ctx.lineTo(...t(x, y + 1, z));
            ctx.closePath();
            ctx.fill();

            // ctx.fillStyle = 'lightgray';

            // ctx.beginPath();
            // ctx.moveTo(...t(x, y + 1, z));
            // ctx.lineTo(...t(x, y + 1, 0));
            // ctx.lineTo(...t(x + 1, y + 1, 0));
            // ctx.lineTo(...t(x + 1, y + 1, z));
            // ctx.closePath();
            // ctx.fill();
        }
    }
}
