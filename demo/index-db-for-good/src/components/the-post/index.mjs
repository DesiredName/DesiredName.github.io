import fetch_template from '/utils/fetch-template.mjs';

class ThePost extends HTMLElement {
    #shadow;
    #is_loaded;

    #el_container;
    #el_delete;
    #el_title;
    #el_description;

    #post = {};

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#is_loaded = fetch_template(
            './src/components/the-post/index.html',
        ).then((template) => this.#init(template));
    }

    get post() {
        return this.#post;
    }

    set post(post) {
        this.#post = post;
        this.#update_post();
    }

    #init(template) {
        const shadow = this.#shadow;

        shadow.innerHTML = template;

        this.#el_container = shadow.querySelector('.the-post');
        this.#el_delete = shadow.querySelector('.the-delete');
        this.#el_title = shadow.querySelector('.the-title');
        this.#el_description = shadow.querySelector('.the-description');

        this.#el_delete.addEventListener(
            'click',
            () => this.#handle_emit_delete(),
            { passive: true, once: true },
        );
    }

    #handle_emit_delete() {
        const detail = {
            post_id: this.#post.id,
            image_id: this.#post.image_id,
        };
        const event = new CustomEvent('delete', { detail });

        this.dispatchEvent(event);
    }

    async #update_post() {
        await this.#is_loaded;

        const dataUrl = URL.createObjectURL(this.#post.image);

        this.#el_container.style.backgroundImage = `url(${dataUrl})`;
        this.#el_title.textContent = this.#post.title;
        this.#el_description.textContent = this.#post.description;

        this.#el_container.style.opacity = 1;
    }
}

customElements.define('the-post', ThePost);
