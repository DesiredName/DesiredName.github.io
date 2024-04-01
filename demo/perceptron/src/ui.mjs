class InputMode {
    static Learn = 'learn';
    static Classify = 'classify';
}

class MarkerType {
    static Soldier = 'soldier';
    static Zombie = 'zombie';
}

export default function UIHelperFunctions({
    canvas,
    coordinates,
    drawtools,
    perceptron,
}) {
    const dataset = [];

    let input_mode = InputMode.Learn;
    let input_marker_type = MarkerType.Soldier;

    const el_n = document.getElementById('n');
    const el_error = document.getElementById('error');
    const el_input_mode = document.getElementsByName('input_mode');
    const el_input_marker_type = document.getElementsByName('marker_type');
    const el_reset = document.getElementById('reset');

    return {
        init() {
            // init handlers
            canvas.onclick = this.handle_canvas_click.bind(this);
            el_n.onchange = this.handle_n_change.bind(this);
            [...el_input_mode].forEach(
                (el) =>
                    (el.onchange = this.handle_input_mode_change.bind(this)),
            );
            [...el_input_marker_type].forEach(
                (el) =>
                    (el.onchange =
                        this.handle_input_marker_type_change.bind(this)),
            );
            el_reset.onclick = this.handle_reset.bind(this);

            // set defaults
            el_n.value = perceptron.n;
            document.getElementById(input_mode).checked = true;
            document.getElementById(input_marker_type).checked = true;

            // draw
            this.canvas_reset();
        },

        handle_n_change() {
            perceptron.n = el_n.valueAsNumber ?? parseFloat(el_n.value, 10);
        },

        handle_input_mode_change(e) {
            input_mode =
                e.target.value === InputMode.Classify
                    ? InputMode.Classify
                    : InputMode.Learn;

            if (input_mode === InputMode.Learn) {
                dataset.length = 0;

                perceptron.learn(dataset);

                this.check_error();
                this.canvas_reset();
            }

            [...el_input_marker_type].forEach((el) =>
                el.toggleAttribute('disabled', input_mode !== InputMode.Learn),
            );
        },

        handle_input_marker_type_change(e) {
            input_marker_type =
                e.target.value === MarkerType.Soldier
                    ? MarkerType.Soldier
                    : MarkerType.Zombie;
        },

        handle_canvas_click(e) {
            const { x, y } = coordinates.from_click_to_screen(e);
            const { x: lx, y: ly } = coordinates.from_screen_to_local({ x, y });

            if (input_mode === InputMode.Classify) {
                const marker_type = perceptron.classify({ x: lx, y: ly });

                this.canvas_draw_marker({ marker_type, x, y });
            } else {
                dataset.push({
                    marker_type:
                        input_marker_type === MarkerType.Soldier ? -1 : 1,
                    x: lx,
                    y: ly,
                });

                perceptron.learn(dataset);

                this.check_error();
                this.canvas_redraw_all_markers(dataset);
            }
        },

        handle_reset() {
            dataset.splice(0);
            perceptron.has_error = false;

            this.check_error();
            this.canvas_reset();
        },

        check_error() {
            const method = perceptron.has_error ? 'add' : 'remove';

            el_error.classList[method]('active');
        },

        canvas_redraw_all_markers(markers) {
            this.canvas_reset();

            markers.forEach(({ marker_type, x, y }) => {
                this.canvas_draw_marker({
                    marker_type,
                    ...coordinates.from_local_to_screen({ x, y }),
                });
            });
        },

        canvas_draw_marker(marker) {
            drawtools.draw_marker(marker);
        },

        canvas_reset() {
            const { x: sx, y: sy } = coordinates.from_local_to_screen({
                x: -1000,
                y: perceptron.threshold(-1000),
            });
            const { x: ex, y: ey } = coordinates.from_local_to_screen({
                x: 1000,
                y: perceptron.threshold(1000),
            });

            drawtools.clear_bckg();
            drawtools.draw_bckg({
                sx,
                sy,
                ex,
                ey,
            });
        },
    };
}
