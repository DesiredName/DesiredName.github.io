import { PriorityQueue } from './priority_queue.mjs';

export default function (height_map) {
    const max_x = height_map.length;
    const max_y = height_map[0].length;
    const visited = {};
    const queue = PriorityQueue('max_first');

    for (let x = 0; x < max_x; x++) {
        visited[x] = {};

        for (let y = 0; y < max_y; y++) {
            if (x == 0 || x == max_x - 1 || y == 0 || y == max_y - 1) {
                queue.enqueue(height_map[x][y], x, y);
                visited[x][y] = true;
            } else {
                visited[x][y] = false;
            }
        }
    }

    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    let entry = null;
    let water_cells = [];

    for (let x = 0; x < max_x; x++) {
        water_cells[x] = [];
        for (let y = 0; y < max_y; y++) {
            water_cells[x][y] = 0;
        }
    }

    while ((entry = queue.dequeue()) != null) {
        const [value, x, y] = entry;

        for (const [dx, dy] of directions) {
            const tx = x + dx;
            const ty = y + dy;

            if (
                tx >= 0 &&
                tx < max_x &&
                ty >= 0 &&
                ty < max_y &&
                visited[tx][ty] === false
            ) {
                const height_map_value = height_map[tx][ty];
                const level = Math.max(0, value - height_map_value);

                water_cells[tx][ty] = height_map_value + level;
                visited[tx][ty] = true;

                queue.enqueue(Math.max(value, height_map_value), tx, ty);
            }
        }
    }

    return water_cells;
}
