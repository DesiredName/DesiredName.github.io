export class GameInputEvent {
    static GoLeft = 10;
    static GoRight = 11;
    static GoUp = 12;
    static GoDown = 13;
    static CellClicked = 100;
}

export default class GameInput {
    #el;
    #offset_x;
    #offset_y;

    constructor(el) {
        const rect = el.getBoundingClientRect();

        this.#el = el;
        this.#offset_x = rect.x;
        this.#offset_y = rect.y;
    }

    on_keyboard_event(callback) {
        window.addEventListener('keydown', (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();

            switch (e.key) {
                case 'ArrowLeft':
                    return callback(GameInputEvent.GoLeft);

                case 'ArrowRight':
                    return callback(GameInputEvent.GoRight);

                case 'ArrowUp':
                    return callback(GameInputEvent.GoUp);

                case 'ArrowDown':
                    return callback(GameInputEvent.GoDown);
            }
        });
    }

    on_controller_event(callback) {
        function trigger_event({ raw_x, raw_y }) {
            const cell_x = Math.floor(raw_x / 32);
            const cell_y = Math.floor(raw_y / 32);

            callback({ raw_x, raw_y, cell_x, cell_y });
        }

        this.#el.addEventListener('mousedown', (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();

            trigger_event({
                raw_x: e.clientX - this.#offset_x,
                raw_y: e.clientY - this.#offset_y,
            });
        });

        this.#el.addEventListener(
            'touchstart',
            (e) => {
                e.stopImmediatePropagation();
                e.stopPropagation();

                const touch = e.changedTouches[0];

                if (touch != null) {
                    trigger_event({
                        raw_x: touch.clientX - this.#offset_x,
                        raw_y: touch.clientY - this.#offset_y,
                    });
                }
            },
            { passive: true },
        );
    }
}
