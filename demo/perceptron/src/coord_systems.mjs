export default function CoordSystemsHelper(canvas) {
    const { x, y } = canvas.getBoundingClientRect();
    const area_width = parseInt(canvas.getAttribute('width'), 10);
    const area_height = parseInt(canvas.getAttribute('height'), 10);

    const a_w_2 = area_width / 2;
    const a_h_2 = area_height / 2;

    return {
        from_click_to_screen(e) {
            return {
                x: e.clientX - x,
                y: e.clientY - y,
            };
        },

        from_screen_to_local({ x, y }) {
            return {
                x: x - a_w_2,
                y: a_h_2 - y,
            };
        },

        from_local_to_screen({ x, y }) {
            return {
                x: a_w_2 + x,
                y: a_h_2 - y,
            };
        },
    };
}
