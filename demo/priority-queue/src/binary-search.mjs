export default function BS(queue, prop_name, target_value) {
    const lookup = (l, r) => {
        if (l >= r) {
            return l;
        } else {
            const mid = Math.floor((l + r) / 2);
            const value = queue[mid][prop_name];

            if (value > target_value) {
                return lookup(l, mid);
            } else {
                return lookup(mid + 1, r);
            }
        }
    };

    return lookup(0, queue.length);
}
