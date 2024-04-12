export function PriorityQueue(variant /* min_first, max_first */) {
    return {
        q: [],
        comparer:
            variant === 'min_first'
                ? (value, queued_value) => value > queued_value
                : (value, queued_value) => value < queued_value,

        enqueue(value, x, y) {
            const bin_search = (queue, left, right) => {
                if (left === right) {
                    return left;
                }

                const mid = Math.floor((left + right) / 2);

                if (this.comparer(value, queue[mid][0])) {
                    return bin_search(queue, mid + 1, right);
                } else {
                    return bin_search(queue, left, mid);
                }
            };

            const i = bin_search(this.q, 0, this.q.length);

            this.q.splice(i, 0, [value, x, y]);
        },

        dequeue() {
            return this.q.pop();
        },

        [Symbol.toString]() {
            return this.q.map(([v]) => v).join(' -> ');
        },
    };
}
