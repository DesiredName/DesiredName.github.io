const template = fetch('./src/the-cam-controls/index.html', {
    method: 'GET',
    credentials: 'same-origin',
}).then((res) => res.text());

const state = {
    p: 0,
    r: 0,
    x: 0,
    y: 0,
};

function extract_as_value(e, prev, prop) {
    const d = e.target.valueAsNumber - prev[prop];
    prev[prop] = e.target.valueAsNumber;

    return d;
}

class TheCamControls extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        template
            .then((html) => (shadow.innerHTML = html))
            .then(() => {
                shadow.getElementById('pan').oninput = (e) => {
                    this.#emit_event('pan', extract_as_value(e, state, 'p'));
                };

                shadow.getElementById('rotate').oninput = (e) => {
                    this.#emit_event('rotate', extract_as_value(e, state, 'r'));
                };

                shadow.getElementById('move_x').oninput = (e) => {
                    this.#emit_event('move', {
                        x: extract_as_value(e, state, 'x'),
                        y: 0,
                    });
                };
                shadow.getElementById('move_y').oninput = (e) => {
                    this.#emit_event('move', {
                        x: 0,
                        y: extract_as_value(e, state, 'y'),
                    });
                };
            });
    }

    #emit_event(name, detail) {
        const event = new CustomEvent(name, { detail });

        this.dispatchEvent(event);
    }
}

customElements.define('the-cam-controls', TheCamControls);
