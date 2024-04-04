export default class GameEvents {
    #events = [];

    constructor(events) {
        this.#events = events;
    }

    check_event(player) {
        const { x, y } = player.position;
        const event = this.#events[x]?.[y];

        if (event == null) {
            return;
        }

        if (event.type.includes('text')) {
            alert(event.text);
        }

        if (event.type.includes('teleport')) {
            player.teleport(...event.teleport);
        }
    }
}
