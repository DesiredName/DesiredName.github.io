export default class LRUCache extends EventTarget {
    #capacity = 0;
    #list_head = null;
    #list_tail = null;
    #item_lookup_map = new Map(/* key, node */);

    constructor(capacity) {
        super();
        this.capacity = capacity;
    }

    //
    //
    //

    set capacity(value) {
        const number = parseInt(value, 10);
        this.#capacity = Number.isNaN(number) ? 3 : number;
    }

    get capacity() {
        return this.#capacity;
    }

    add(key, item) {
        if (this.#item_lookup_map.size >= this.#capacity) {
            this.#dispatch_delete(this.#list_tail);
            this.#drop_tail_node();
        }

        const node = this.#build_node(key, item, null, this.#list_head);

        this.#set_new_head_node(node);
        this.#dispatch_add();
    }

    get(key) {
        return this.#item_lookup_map.get(key);
    }

    update(node) {
        this.#move_node_to_head(node);
        this.#dispatch_update(node);
    }

    //
    //
    //

    #build_node(key, item, previous = null, next = null) {
        return {
            key,
            item,
            previous,
            next,
        };
    }

    #drop_tail_node() {
        this.#item_lookup_map.delete(this.#list_tail.key);
        this.#list_tail = this.#list_tail.previous;
        this.#list_tail.next = null;
    }

    #set_new_head_node(node) {
        if (this.#list_head == null) {
            this.#list_head = node;
        } else {
            this.#list_head.previous = node;
            this.#list_head = node;
        }

        this.#list_tail = this.#list_tail ?? this.#list_head;
        this.#item_lookup_map.set(node.key, node);
    }

    #move_node_to_head(node) {
        if (this.#list_head === node) {
            // already a head, no actions required
            return;
        } else if (this.#list_tail === node) {
            // is a tail
            this.#list_tail = node.previous;

            node.previous.next = null;
            node.previous = null;
        } else {
            // somewhere inbetween
            node.previous.next = node.next;
            node.next.previous = node.previous;
            node.previous = null;
        }

        node.next = this.#list_head;
        this.#list_head.previous = node;
        this.#list_head = node;
    }

    // events

    #dispatch_add() {
        const node = this.#list_head;

        const event = new CustomEvent('add', {
            detail: { node },
        });

        this.dispatchEvent(event);
    }

    #dispatch_update(node) {
        const event = new CustomEvent('update', {
            detail: { node },
        });

        this.dispatchEvent(event);
    }

    #dispatch_delete(node) {
        const event = new CustomEvent('delete', {
            detail: { node },
        });

        this.dispatchEvent(event);
    }
}
