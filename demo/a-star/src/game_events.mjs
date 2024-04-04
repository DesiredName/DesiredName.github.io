export default class GameEvents {
    #events = [];

    constructor(events) {
        this.#events = events;
    }

    check_event({ x, y }, callback) {
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
    }
}
