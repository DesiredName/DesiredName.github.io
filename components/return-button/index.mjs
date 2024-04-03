class ReturnButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        shadow.innerHTML = `
        <link rel="stylesheet" href="/components/return-button/style.css">
        <a class="return-button" href="${location.origin}">
            <img
                alt="close demo button"
                arai-label="Close demo window"
                src="/assets/close.svg"
                height="32"
                width="32"
            />
        </a>`;
    }
}

customElements.define('return-button', ReturnButton);
