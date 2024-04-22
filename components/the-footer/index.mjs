import fetch_template from '/utils/fetch-template.mjs';

class TheFooter extends HTMLElement {
    static observedAttributes = ['title', 'links'];

    #link_template;
    #el_summary;
    #el_links_list;

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        fetch_template('/components/the-footer/index.html').then((template) => {
            shadow.innerHTML = template;

            this.#link_template = shadow.getElementById('link_template');
            this.#el_summary = shadow.querySelector('.footer-summary');
            this.#el_links_list = shadow.querySelector('.footer-content');

            this.#update_title();
            this.#create_links();
        });
    }

    #update_title() {
        this.#el_summary.textContent = this.getAttribute('title');
    }

    #create_links() {
        const links = JSON.parse(
            this.getAttribute('links')
                .replace(/\s{2,}/g, ' ')
                .replace("'", '"'),
        );

        links.forEach(([href, description]) =>
            this.#create_link(href, description),
        );
    }

    #create_link(href, description) {
        const clone = this.#link_template.cloneNode();

        clone.textContent = description;
        clone.removeAttribute('id');
        clone.setAttribute('href', href);

        this.#el_links_list.appendChild(clone);
        this.#el_links_list.appendChild(document.createElement('br'));
    }
}

customElements.define('the-footer', TheFooter);
