export default class GameConsole {
    #el;
    #formatter = Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    constructor(el) {
        this.#el = el;
    }

    print_message(message) {
        const time = document.timeline.currentTime;
        const formatted_message = `${this.#formatter.format(time)}: ${message}`;
        const line = document.createElement('div');

        line.className = 'message';
        line.textContent = formatted_message;

        this.#el.appendChild(line);

        requestAnimationFrame(() => line.scrollIntoView(false));
    }
}
