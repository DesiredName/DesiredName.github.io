export default function HareTortoise(head) {
    const steps = [];

    if (head == null || head.next == null) {
        return [];
    } else if (head === head.next) {
        return [];
    } else {
        const move = (p) => p.next;

        let p_hare = move(move(head));
        let p_tortoise = move(head);

        steps.push({ t: p_tortoise.value, h: p_hare.value });

        while (p_tortoise !== p_hare) {
            p_hare = move(move(p_hare));
            p_tortoise = move(p_tortoise);

            steps.push({ t: p_tortoise.value, h: p_hare.value });
        }

        p_tortoise = head;

        while (p_tortoise !== p_hare) {
            p_tortoise = move(p_tortoise);
            p_hare = move(p_hare);

            steps.push({ t: p_tortoise.value, h: p_hare.value });
        }

        return steps;
    }
}
