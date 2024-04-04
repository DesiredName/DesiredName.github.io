const key = (x, y) => `${x},${y}`;

export default class Grid {
    #grid = new Map(/* key: x,y, value: GridNode */);

    constructor(structure) {
        const height = structure.length;
        const width = structure[0].length;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cost = structure[y][x];

                this.add_node(new GridNode(x, y, cost));
            }
        }
    }

    add_node(node) {
        const { x, y } = node;

        this.#grid.set(key(x, y), node);

        node.connect(this.#grid.get(key(x - 1, y)));
        node.connect(this.#grid.get(key(x - 1, y - 1)));
        node.connect(this.#grid.get(key(x, y - 1)));
    }

    get_node_cost({ x, y }) {
        return this.#grid.get(key(x, y))?.g ?? 0;
    }

    get_path(from, to) {
        return [];
    }
}

export class GridNode {
    #connections = new Set(/*GridNode*/);

    constructor(x, y, g) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = Number.POSITIVE_INFINITY;
    }

    connect(node) {
        if (node != null && !this.#connections.has(node)) {
            this.#connections.add(node);
            node.connect(this);
        }
    }

    get_connections() {
        return this.#connections;
    }
}
