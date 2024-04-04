export default class Player {
    #el;
    #x;
    #y;
    #grid;
    #is_moving = false;

    constructor(el, { x, y }, grid) {
        this.#el = el;
        this.#x = x;
        this.#y = y;
        this.#grid = grid;

        this.#el.addEventListener('transitionstart', () => {
            this.#is_moving = true;
        });

        this.#el.addEventListener('transitionend', () => {
            this.#is_moving = false;
        });

        this.#el.addEventListener('transitioncancel', () => {
            this.#is_moving = false;
        });
    }

    get position() {
        return {
            x: this.#x,
            y: this.#y,
        };
    }

    go_left() {
        this.#go(this.#x - 1, this.#y);
    }

    go_right() {
        this.#go(this.#x + 1, this.#y);
    }

    go_up() {
        this.#go(this.#x, this.#y - 1);
    }

    go_down() {
        this.#go(this.#x, this.#y + 1);
    }

    teleport(x, y) {
        this.#go(x, y, true);
    }

    #go(x, y, is_teleport = false) {
        this.#rotate(x, y);

        const cost = this.#grid.get_node_cost({ x, y });

        if (!is_teleport && (cost === 0 || this.#is_moving)) {
            return;
        }

        this.#el.style.transitionDuration = `${cost * 100}ms`;
        this.#el.style.left = `${x * 32}px`;
        this.#el.style.top = `${y * 32}px`;
        this.#x = x;
        this.#y = y;
    }

    #rotate(x, y) {
        if (this.#y === y) {
            const is_going_left = this.#x < x;
            this.#el.style.transform = is_going_left ? 'scaleX(-1)' : 'none';
        }
    }
}
