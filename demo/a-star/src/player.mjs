export default class Player {
    #el;
    #x;
    #y;
    #grid;
    #is_acting = false;
    #is_hidden = false;
    #actions_stack = [];

    #on_action_end = () => {};

    constructor({
        el,
        initial_position: { x, y },
        grid,
        check_events_callback,
    }) {
        this.#el = el;
        this.#x = x;
        this.#y = y;
        this.#grid = grid;
        this.#on_action_end = check_events_callback;
        this.#listen_events();
    }

    get position() {
        return {
            x: this.#x,
            y: this.#y,
        };
    }

    get is_hidden() {
        return this.#is_hidden;
    }

    // loop

    update() {
        if (this.#is_acting) {
            return;
        } else {
            const next = this.#actions_stack.pop();

            if (next != null) {
                next();
            }
        }
    }

    // actions

    go_left() {
        this.#add_action(() => {
            this.#clear_actions();
            this.#go(this.#x - 1, this.#y);
        });
    }

    go_right() {
        this.#add_action(() => {
            this.#clear_actions();
            this.#go(this.#x + 1, this.#y);
        });
    }

    go_up() {
        this.#add_action(() => {
            this.#clear_actions();
            this.#go(this.#x, this.#y - 1);
        });
    }

    go_down() {
        this.#add_action(() => {
            this.#clear_actions();
            this.#go(this.#x, this.#y + 1);
        });
    }

    hide() {
        this.#tmpl_if_player_visible(() => {
            this.#add_action(() => {
                this.#is_hidden = true;
                this.#el.style.opacity = 0;
            });
        });
    }

    show() {
        this.#tmpl_if_player_hidden(() => {
            this.#add_action(() => {
                this.#is_hidden = false;
                this.#el.style.opacity = 1;
            });
        });
    }

    move_along_path(path) {
        this.#clear_actions();

        path.forEach((node) => {
            this.#add_action(() => this.#go(node.x, node.y));
        });
    }

    goto(x, y, anim_time) {
        this.#add_action(() => {
            this.#clear_actions();
            this.#move(x, y, anim_time);
        });
    }

    // remplates
    #tmpl_if_player_hidden(func) {
        if (this.#is_hidden === false) {
            return;
        } else {
            func();
        }
    }

    #tmpl_if_player_visible(func) {
        if (this.#is_hidden === true) {
            return;
        } else {
            func();
        }
    }

    // intenals

    #listen_events() {
        this.#el.addEventListener('transitionstart', () => {
            this.#is_acting = true;
        });

        this.#el.addEventListener('transitionrun', () => {
            this.#is_acting = true;
        });

        this.#el.addEventListener('transitionend', () => {
            this.#is_acting = false;
            this.#on_action_end(this);
        });

        this.#el.addEventListener('transitioncancel', () => {
            this.#is_acting = false;
            this.#on_action_end(this);
        });
    }

    #clear_actions() {
        this.#actions_stack.splice(0);
    }

    #add_action(action) {
        this.#actions_stack.push(action);
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
