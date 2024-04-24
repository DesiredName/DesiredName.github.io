const format = Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

class TheConsole extends HTMLElement {
    #content_el;

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        this.#content_el = document.createElement('div');
        this.#content_el.className = 'console';

        shadow.innerHTML =
            '<link rel="stylesheet" href="/components/the-console/style.css">';
        shadow.appendChild(this.#content_el);
    }

    push_message({ message }, { timestamp = false } = {}) {
        const html = [];

        if (timestamp === true) {
            html.push(
                `<span class='time'>${format.format(Date.now())}</span"> `,
            );
        }

        html.push(message);

        const message_el = document.createElement('div');
        message_el.className = 'message';
        message_el.innerHTML = html.join('');

        this.#clear_old_messages();
        this.#content_el.appendChild(message_el);

        requestIdleCallback(() => {
            message_el.scrollIntoView({ block: 'end' });
        });
    }

    #clear_old_messages() {
        if (this.#content_el.children.length > 100) {
            this.#content_el.children.item(0).remove();
        }
    }
}

customElements.define('the-console', TheConsole);
