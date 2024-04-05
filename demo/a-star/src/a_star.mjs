export default function find_path(start, end) {
    const processed = new Set([]);
    let to_search = [start];
    let result = null;

    while (to_search.length > 0) {
        let index = to_search.length - 1;
        let current = to_search[index];

        to_search.forEach((node, i) => {
            if (
                node.weight < current.weight ||
                (node == current && node.h < current.h)
            ) {
                index = i;
                current = node;
            }
        });

        to_search.splice(index, 1);
        processed.add(current);

        if (end === current) {
            result = current;
            break;
        }

        for (let neightbor of current.connections) {
            if (neightbor.is_walkable !== true) {
                continue;
            }

            if (processed.has(neightbor) === true) {
                continue;
            }

            const in_search = to_search.includes(neightbor);
            const new_g = current.g + neightbor.cost;

            if (in_search === false || new_g < neightbor.g) {
                neightbor.g = new_g;
                neightbor.parent = current;

                if (in_search === false) {
                    to_search.push(neightbor);
                }
            }
        }
    }

    return result;
}
