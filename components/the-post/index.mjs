class ThePost extends HTMLElement {
    static observedAttributes = ['title', 'repo-link', 'description'];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const el_content = document.createElement('div');
        el_content.className = 'the-post';

        const el_title = document.createElement('div');
        el_title.className = 'title';
        el_title.textContent = this.getAttribute('title');
        el_content.appendChild(el_title);

        const el_description = document.createElement('div');
        el_description.className = 'description';
        el_description.innerHTML = this.getAttribute('description');
        el_content.appendChild(el_description);

        const el_links_block = document.createElement('div');
        el_links_block.className = 'links-block';
        el_content.appendChild(el_links_block);

        const github_link = this.getAttribute('github-link');
        if (github_link != null) {
            const el_github_link = document.createElement('a');
            el_github_link.className = 'github-link';
            el_github_link.href = el_github_link.target = '_blank';
            el_links_block.appendChild(el_github_link);
        }

        const el_style = document.createElement('link');
        el_style.setAttribute('rel', 'stylesheet');
        el_style.setAttribute('href', '/components/the-post/style.css');

        shadow.appendChild(el_style);
        shadow.appendChild(el_content);

        this.onclick = () =>
            window.open(this.getAttribute('demo-link'), '_blank');
    }
}

customElements.define('the-post', ThePost);