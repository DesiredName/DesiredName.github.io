export class PriorityQueueOrdering {
    static MIN_FIRST = 'min_first';
    static MAX_FIRST = 'max_first';
}

export default function PriorityQueueBuilder(
    compare_prop_name /* the name of an object property to compare againts; this should be an integer, okay? */,
    variant /* PriorityQueueOrdering */,
) {
    return {
        q: [],
        comparer:
            variant === PriorityQueueOrdering.MIN_FIRST
                ? (v1, v2) => v1[compare_prop_name] > v2[compare_prop_name]
                : (v1, v2) => v1[compare_prop_name] < v2[compare_prop_name],

        enqueue(entity) {
            const bin_search = (queue, left, right) => {
                if (left === right) {
                    return left;
                }

                const mid = Math.floor((left + right) / 2);

                if (this.comparer(entity, queue[mid])) {
                    return bin_search(queue, mid + 1, right);
                } else {
                    return bin_search(queue, left, mid);
                }
            };

            const i = bin_search(this.q, 0, this.q.length);

            this.q.splice(i, 0, entity);
        },

        peek() {
            return this.q[this.q.length - 1];
        },

        dequeue() {
            return this.q.pop();
        },
    };
}
