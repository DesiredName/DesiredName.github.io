export default function BuildLinkedList(length, cycle_at) {
    if (length === 0) {
        return null;
    } else {
        const root = {
            value: 0,
            next: null,
        };

        let index = 1;
        let current = root;
        let cycle = null;

        while (index < length) {
            current.next = {
                value: index,
                next: null,
            };
            current = current.next;

            if (index === cycle_at) {
                cycle = current;
            }

            index++;
        }

        current.next = cycle;

        return root;
    }
}
