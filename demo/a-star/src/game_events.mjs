export default class GameEvents {
    #events = [];
    #last_seen_position = {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
    };

    constructor(events) {
        this.#events = events;
    }

    check_event({ x, y }, callback) {
        if (
            this.#last_seen_position.x === x &&
            this.#last_seen_position.y === y
        ) {
            return;
        }

        const event = this.#events[x]?.[y];

        if (event == null) {
            return;
        }

        if (typeof event.repeat === 'number') {
            if (event.repeat > 0) {
                event.repeat = event.repeat - 1;
                callback(event);
            }
        } else {
            callback(event);
        }

        this.#last_seen_position.x = x;
        this.#last_seen_position.y = y;
    }
}
