import { RENDERER_EVENTS } from './renderer.mjs';

export function parse_heightmap(raw_input) {
    return raw_input
        .trim()
        .split(/\r\n|\n/g)
        .map((row) => {
            return row.split(',').filter(Boolean).map(Number);
        });
}

export function link_canvas_events(canvas, renderer) {
    const { x: x_offset, y: y_offset } = canvas.getBoundingClientRect();

    let current_pivot = null;

    function stop_event(next, e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();

        next(e);
    }

    function extract_translation(e) {
        const touch = e.touches?.[0] ?? e.changedTouches?.[0];
        const x = e.clientX ?? touch.clientX ?? 0;
        const y = e.clientY ?? touch.clientY ?? 0;

        return {
            x: x - x_offset,
            y: y - y_offset,
        };
    }

    function calculate_with_offset({ x, y }) {
        return {
            x: x - current_pivot.x,
            y: y - current_pivot.y,
        };
    }

    function normalize({ x, y }) {
        const d = Math.sqrt(x * x + y * y);
        return {
            x: x / d / 10,
            y: y / d / 10,
        };
    }

    function on_start_event(e) {
        current_pivot = extract_translation(e);
    }

    function on_move_event(e) {
        if (current_pivot == null) {
            return;
        }

        const next_pivot = extract_translation(e);

        renderer.postMessage({
            name: RENDERER_EVENTS.CAMERA_MOVE,
            translation: normalize(calculate_with_offset(next_pivot)),
        });

        current_pivot = next_pivot;
    }

    function on_stop_event(e) {
        if (current_pivot == null) {
            return;
        }

        current_pivot = null;
    }

    function on_change_panning(e) {
        renderer.postMessage({
            name: RENDERER_EVENTS.CAMERA_PAN,
            pan: e.wheelDelta > 0 ? -1 : 1,
        });
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
