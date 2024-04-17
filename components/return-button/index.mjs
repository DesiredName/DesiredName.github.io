import fetch_template from '/utils/fetch-template.mjs';

class ReturnButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        fetch_template('/components/return-button/index.html').then(
            (template) => {
                shadow.innerHTML = template;

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        requestIdleCallback(() => {
                            window.location.href = location.origin;
                            console.dir(location);
                        });
                        return false;
                    }
                });
            },
        );
    }
}

customElements.define('return-button', ReturnButton);
