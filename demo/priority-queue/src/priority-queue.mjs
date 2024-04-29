import BS from './binary-search.mjs';

export default class PQController extends EventTarget {
    #q = [];

    get is_empty() {
        return this.#q.length === 0;
    }

    get is_full() {
        return this.#q.length > 5;
    }

    #emit_change() {
        const e = new CustomEvent('change', {
            detail: this.#q,
        });

        this.dispatchEvent(e);
    }

    enqueue({ p, task }) {
        if (this.is_empty) {
            this.#q.push({ p, task });
        } else {
            const index = BS(this.#q, 'p', p);
            this.#q.splice(index, 0, { p, task });
        }

        this.#emit_change();
    }

    dequeue() {
        const target = this.#q.pop();

        this.#emit_change();

        return target;
    }

    peek() {
        return this.#q[this.#q.length - 1];
    }

    print() {
        return console.log(JSON.stringify(this.#q));
    }
}
