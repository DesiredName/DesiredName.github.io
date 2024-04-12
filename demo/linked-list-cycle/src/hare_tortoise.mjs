export default function HareTortoise(head) {
    const steps = [];

    if (head == null || head.next == null) {
        return null;
    } else if (head == head.next) {
        return head;
    } else {
        let p_tortoise = head;
        let p_hare = head;

        steps.push({ t: p_tortoise.value, h: p_hare.value });

        while (true) {
            p_tortoise = p_tortoise.next;
            p_hare = p_hare.next;

            if (p_hare == null || p_hare.next == null) {
                return null;
            } else {
                p_hare = p_hare.next;
            }

            steps.push({ t: p_tortoise.value, h: p_hare.value });

            if (p_tortoise === p_hare) {
                break;
            }
        }

        p_tortoise = head;

        while (p_tortoise !== p_hare) {
            p_tortoise = p_tortoise.next;
            p_hare = p_hare.next;

            steps.push({ t: p_tortoise.value, h: p_hare.value });
        }

        return steps;
    }
}
