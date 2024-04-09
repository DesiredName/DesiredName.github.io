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

    let start_point = null;

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

    function get_start_point_offset({ x, y }) {
        return {
            x: x - start_point.x,
            y: y - start_point.y,
        };
    }

    function on_start_event(e) {
        start_point = extract_translation(e);
    }

    function on_move_event(e) {
        if (start_point == null) {
            return;
        }

        renderer.postMessage({
            name: RENDERER_EVENTS.SET_TRANSLATION,
            translation: get_start_point_offset(extract_translation(e)),
        });
    }

    function on_stop_event(e) {
        if (start_point == null) {
            return;
        }

        renderer.postMessage({
            name: RENDERER_EVENTS.FIX_TRANSLATION,
            translation: get_start_point_offset(extract_translation(e)),
        });

        start_point = null;
    }

    function on_change_scale(e) {
        renderer.postMessage({
            name: RENDERER_EVENTS.CHANGE_SCALE,
            delta: e.wheelDelta < 0 ? -0.1 : 0.1,
        });
    }

    canvas.onmousedown = stop_event.bind(this, on_start_event);
    canvas.ontouchstart = stop_event.bind(this, on_start_event);

    canvas.onmousemove = stop_event.bind(this, on_move_event);
    canvas.ontouchmove = stop_event.bind(this, on_move_event);

    canvas.onmouseup = stop_event.bind(this, on_stop_event);
    canvas.onmouseleave = stop_event.bind(this, on_stop_event);
    canvas.ontouchend = stop_event.bind(this, on_stop_event);

    canvas.onwheel = on_change_scale;
}
