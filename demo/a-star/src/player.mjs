export default class Player {
    #el;
    #x;
    #y;
    #grid;
    #is_acting = false;
    #actions_stack = [];

    constructor(el, { x, y }, grid) {
        this.#el = el;
        this.#x = x;
        this.#y = y;
        this.#grid = grid;

        this.#el.addEventListener('transitionstart', () => {
            this.#is_acting = true;
        });

        this.#el.addEventListener('transitionend', () => {
            this.#is_acting = false;
        });

        this.#el.addEventListener('transitioncancel', () => {
            this.#is_acting = false;
        });
    }

    get position() {
        return {
            x: this.#x,
            y: this.#y,
        };
    }

    update() {
        if (this.#is_acting === false && this.#actions_stack.length > 0) {
            this.#is_acting = true;
            this.#actions_stack.pop()?.();
        }
        console.dir(this.#actions_stack);
    }

    // actions

    go_left() {
        this.#add_action(() => this.#go(this.#x - 1, this.#y));
    }

    go_right() {
        this.#add_action(() => this.#go(this.#x + 1, this.#y));
    }

    go_up() {
        this.#add_action(() => this.#go(this.#x, this.#y - 1));
    }

    go_down() {
        this.#add_action(() => this.#go(this.#x, this.#y + 1));
    }

    hide() {
        this.#add_action(() => (this.#el.style.opacity = 0));
    }

    show() {
        this.#add_action(() => (this.#el.style.opacity = 1));
    }

    move_along_path(path) {
        this.#actions_stack.splice(0);

        path.forEach((node) => {
            this.#add_action(() => this.#go(node.x, node.y));
        });
        console.dir(this.#actions_stack);
    }

    goto(x, y, anim_time) {
        this.#add_action(() => this.#move(x, y, anim_time));
    }

    #add_action(action) {
        this.#actions_stack.push(action);
        console.dir(this.#actions_stack);
    }

    #go(x, y) {
        this.#rotate(x, y);

        const cost = this.#grid.get_node_cost({ x, y });

        if (cost !== 0) {
            this.#move(x, y, cost * 100);
        }
    }

    #move(x, y, anim_time) {
        this.#rotate(x, y);

        this.#el.style.transitionDuration = `${anim_time}ms`;
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
