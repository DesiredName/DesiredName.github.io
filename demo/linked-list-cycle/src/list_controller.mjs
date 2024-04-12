export default class ListController {
    #el_tortoise = null;
    #el_hare = null;
    #el_items = null;
    #el_arrow = null;
    #parent_position_x = 0;

    #length = 0;
    #cycle_at = 0;

    constructor({
        el_tortoise,
        el_hare,
        el_items,
        el_arrow,
        length,
        cycle_at,
    }) {
        this.#el_tortoise = el_tortoise;
        this.#el_hare = el_hare;
        this.#el_items = el_items;
        this.#el_arrow = el_arrow;
        this.#parent_position_x = this.#el_items.getBoundingClientRect().x;

        this.length = length;
        this.cycle_at = cycle_at;
    }

    set length(value) {
        const to_delete = Math.max(0, this.#length - value);
        const to_add = Math.max(0, value - this.#length);

        this.#length = value;
        this.#cycle_at = Math.min(value, this.#cycle_at);

        requestAnimationFrame(() => {
            this.#remove_children(to_delete);
            this.#add_children(to_add);
            this.#update_cycle_display();
            this.#reset_pointers();
        });
    }

    set cycle_at(value) {
        this.#cycle_at = value;

        requestAnimationFrame(() => {
            this.#update_cycle_display();
            this.#reset_pointers();
        });
    }

    move_pointers(hare_index, tortoise_index) {
        this.#move_hare(hare_index);
        this.#move_tortoise(tortoise_index);
    }

    #move_hare(index) {
        const el_item = this.#el_items.children[index];
        const { x, width } = el_item.getBoundingClientRect();
        this.#el_hare.style.width = `${width}px`;
        this.#el_hare.style.left = `${x - this.#parent_position_x}px`;
    }

    #move_tortoise(index) {
        const el_item = this.#el_items.children[index];
        const { x } = el_item.getBoundingClientRect();

        this.#el_tortoise.style.left = `${x - this.#parent_position_x}px`;
    }

    #remove_children(to_delete) {
        while (to_delete--) {
            const index = this.#el_items.childElementCount - 1;
            const child = this.#el_items.children[index];

            this.#el_items.removeChild(child);
        }
    }

    #add_children(to_add) {
        let index = 0;

        while (to_add--) {
            const el = document.createElement('div');

            el.className = 'list-item';
            el.style.animationDelay = `${index * 100}ms`;

            this.#el_items.appendChild(el);

            index++;
        }
    }

    #update_cycle_display() {
        const children_count = this.#el_items.childElementCount;
        let el_cycle = null;
        let el_last_child = this.#el_items.children[children_count - 1];

        for (let i = 0; i < this.#el_items.childElementCount; i++) {
            const child = this.#el_items.children[i];
            const is_cycle = i === this.#cycle_at;

            child.classList.toggle('is-cycle', is_cycle);

            if (is_cycle) {
                el_cycle = child;
            }
        }

        const { x: left_position } = el_cycle.getBoundingClientRect();
        const { x: right_position } = el_last_child.getBoundingClientRect();

        this.#el_arrow.style.left = `${
            left_position - this.#parent_position_x + 22
        }px`;
        this.#el_arrow.style.width = `${right_position - left_position}px`;
    }

    #reset_pointers() {
        const el_first_item = this.#el_items.children[0];
        const el_position = el_first_item.getBoundingClientRect();
        const position = el_position.x - this.#parent_position_x;

        this.#el_hare.style.left = `${position}px`;
        this.#el_tortoise.style.left = `${position}px`;
    }
}
