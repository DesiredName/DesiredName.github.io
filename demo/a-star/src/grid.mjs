import a_start from './a_star.mjs';

const key = (x, y) => `${x},${y}`;

export default class Grid {
    #grid = new Map(/* key: x,y, value: GridNode */);

    constructor(structure) {
        const height = structure.length;
        const width = structure[0].length;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.add_node(
                    new GridNode({
                        x,
                        y,
                        cost: structure[y][x],
                    }),
                );
            }
        }
    }

    add_node(node) {
        const { x, y } = node;

        this.#grid.set(key(x, y), node);

        node.set_connections([
            this.#grid.get(key(x - 1, y + 1)),
            this.#grid.get(key(x - 1, y)),
            this.#grid.get(key(x - 1, y - 1)),
            this.#grid.get(key(x, y + 1)),
            this.#grid.get(key(x, y - 1)),
            this.#grid.get(key(x + 1, y + 1)),
            this.#grid.get(key(x + 1, y)),
            this.#grid.get(key(x + 1, y - 1)),
        ]);
    }

    get_node_cost({ x, y }) {
        return this.#grid.get(key(x, y))?.g ?? 0;
    }

    get_path(from, to) {
        const start = this.#grid.get(key(from.x, from.y));
        const end = this.#grid.get(key(to.x, to.y));

        if (start.connections.has(end)) {
            return [end];
        }

        this.#prepare_nodes(to);

        const result = [];
        let path = a_start(start, end);

        while (path.parent) {
            result.push(path);
            path = path.parent;
        }

        return result;
    }

    #prepare_nodes(target_node) {
        for (let [_, node] of this.#grid) {
            node.prepare(target_node);
        }
    }
}

export class GridNode {
    #parent = null;
    #connections = new Set(/*GridNode*/);
    #is_walkable = false;

    constructor({ x, y, cost }) {
        this.x = x;
        this.y = y;
        this.cost = cost;

        this.g = cost;
        this.h = Number.POSITIVE_INFINITY;

        this.#is_walkable = cost > 0;
    }

    get weight() {
        return this.g + this.h;
    }

    get is_walkable() {
        return this.#is_walkable;
    }

    prepare(target_node) {
        const compute_h = () => {
            const dx = Math.abs(target_node.x - this.x);
            const dy = Math.abs(target_node.y - this.y);

            return Math.sqrt(dx * dx + dy * dy);
        };

        this.g = this.cost;
        this.h = this.#is_walkable ? compute_h() : 0;
        this.#parent = null;
    }

    set parent(node) {
        this.#parent = node;
    }

    get parent() {
        return this.#parent;
    }

    get connections() {
        return this.#connections;
    }

    set_connections(nodes) {
        for (let node of nodes) {
            if (node != null && !this.#connections.has(node)) {
                this.#connections.add(node);
                node.set_connections([this]);
            }
        }
    }
}
