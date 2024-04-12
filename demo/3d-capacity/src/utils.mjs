import { RENDERER_EVENTS } from './renderer.mjs';
import { CAM_CONTROLS_EVENTS } from './the-cam-controls/index.mjs';

export function parse_heightmap(raw_input) {
    return raw_input
        .trim()
        .split(/\r\n|\n/g)
        .map((row) => {
            return row.split(',').filter(Boolean).map(Number);
        });
}

function stop_event(next, e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();

    next(e);
}

function calculate_with_offset(next_pivot, current_pivot) {
    return {
        x: next_pivot.x - current_pivot.x,
        y: next_pivot.y - current_pivot.y,
    };
}

function extract_translation(canvas) {
    const { x: x_offset, y: y_offset } = canvas.getBoundingClientRect();

    return (e) => {
        const touch = e.touches?.[0] ?? e.changedTouches?.[0];
        const x = e.clientX ?? touch.clientX ?? 0;
        const y = e.clientY ?? touch.clientY ?? 0;

        return {
            x: x - x_offset,
            y: y - y_offset,
        };
    };
}

export function link_canvas_events(canvas, callback) {
    const ex = extract_translation(canvas);
    let current_pivot = null;

    function on_start_event(e) {
        current_pivot = ex(e);
    }

    function on_move_event(e) {
        if (current_pivot != null) {
            const next_pivot = ex(e);
            const move = calculate_with_offset(next_pivot, current_pivot);

            callback({ name: RENDERER_EVENTS.CAMERA_MOVE, move });

            current_pivot = next_pivot;
        }
    }

    function on_stop_event() {
        current_pivot = null;
    }

    function on_change_panning(e) {
        const pan = e.wheelDelta > 0 ? -1 : 1;

        callback({ name: RENDERER_EVENTS.CAMERA_PAN, pan });
    }

    canvas.onmousedown = stop_event.bind(this, on_start_event);
    canvas.ontouchstart = stop_event.bind(this, on_start_event);

    canvas.onmousemove = stop_event.bind(this, on_move_event);
    canvas.ontouchmove = stop_event.bind(this, on_move_event);

    canvas.onmouseup = stop_event.bind(this, on_stop_event);
    canvas.onmouseleave = stop_event.bind(this, on_stop_event);
    canvas.ontouchend = stop_event.bind(this, on_stop_event);

    canvas.onwheel = on_change_panning;
}

export function link_cam_controls_events(cam_controls, callback) {
    cam_controls.addEventListener(CAM_CONTROLS_EVENTS.PAN, (e) => {
        callback({ name: RENDERER_EVENTS.CAMERA_PAN, pan: e.detail });
    });
    cam_controls.addEventListener(CAM_CONTROLS_EVENTS.ROTATE, (e) => {
        callback({ name: RENDERER_EVENTS.CAMERA_ROTATE, angle: e.detail });
    });
    cam_controls.addEventListener(CAM_CONTROLS_EVENTS.MOVE, (e) => {
        callback({ name: RENDERER_EVENTS.CAMERA_MOVE, move: e.detail });
    });
    cam_controls.addEventListener(CAM_CONTROLS_EVENTS.SLICE, (e) => {
        callback({ name: RENDERER_EVENTS.CAMERA_SLICE, slice: e.detail });
    });
    cam_controls.addEventListener(CAM_CONTROLS_EVENTS.SHOW_WATER, (e) => {
        callback({
            name: RENDERER_EVENTS.CAMERA_SHOW_WATER,
            show_water: e.detail,
        });
    });
}
