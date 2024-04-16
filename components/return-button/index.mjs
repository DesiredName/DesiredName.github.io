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
            },
        );
    }
}

customElements.define('return-button', ReturnButton);
