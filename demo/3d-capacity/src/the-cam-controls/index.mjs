const template = fetch('./src/the-cam-controls/index.html', {
    method: 'GET',
    credentials: 'same-origin',
}).then((res) => res.text());

export class CAM_CONTROLS_EVENTS {
    static PAN = 'pan';
    static ROTATE = 'rotate';
    static MOVE = 'move';
    static SLICE = 'slice';
    static SHOW_WATER = 'show_water';
}

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
                    this.#emit_event(
                        CAM_CONTROLS_EVENTS.PAN,
                        extract_as_value(e, state, 'p'),
                    );
                };

                shadow.getElementById('rotate').oninput = (e) => {
                    this.#emit_event(
                        CAM_CONTROLS_EVENTS.ROTATE,
                        extract_as_value(e, state, 'r'),
                    );
                };

                shadow.getElementById('move_x').oninput = (e) => {
                    this.#emit_event(CAM_CONTROLS_EVENTS.MOVE, {
                        x: extract_as_value(e, state, 'x'),
                        y: 0,
                    });
                };

                shadow.getElementById('move_y').oninput = (e) => {
                    this.#emit_event(CAM_CONTROLS_EVENTS.MOVE, {
                        x: 0,
                        y: extract_as_value(e, state, 'y'),
                    });
                };

                shadow.getElementById('slice').oninput = (e) => {
                    this.#emit_event(
                        CAM_CONTROLS_EVENTS.SLICE,
                        e.target.valueAsNumber,
                    );
                };

                shadow.getElementById('show_water').onchange = (e) => {
                    this.#emit_event(
                        CAM_CONTROLS_EVENTS.SHOW_WATER,
                        e.target.checked === true,
                    );
                };
            });
    }

    #emit_event(name, detail) {
        const event = new CustomEvent(name, { detail });

        this.dispatchEvent(event);
    }
}

customElements.define('the-cam-controls', TheCamControls);
