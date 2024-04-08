const format = Intl.DateTimeFormat('en', {
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
});

export default class ConsoleHelper {
    #el = null;

    constructor(el) {
        this.#el = el;
    }

    message({ username, time, message }) {
        const formatted_message = `[<span class="time">${format.format(
            time,
        )}</span>] <span class='username'>${username}</span>: ${message}`;

        this.#append_message(formatted_message);
    }

    message_local(message) {
        const formatted_message = `[<span class="time">${format.format(
            Date.now(),
        )}</span>] <span class='username myself'>you</span>: ${message}`;

        this.#append_message(formatted_message);
    }

    #append_message(formatted_message) {
        const displayed_message_el = document.createElement('div');
        displayed_message_el.innerHTML = formatted_message;

        this.#el.appendChild(displayed_message_el);
    }
}
