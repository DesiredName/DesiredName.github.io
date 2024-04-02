class ThePost extends HTMLElement {
    static observedAttributes = ['title', 'repo-link', 'description'];

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });

        const el_content = document.createElement('div');
        el_content.className = 'the-post';

        const title = this.getAttribute('title');
        const el_title = document.createElement('div');
        el_title.className = 'title';
        el_title.textContent = title;
        el_content.setAttribute('aria-label', `demo example for ${title} post`);
        el_content.appendChild(el_title);

        const description = this.getAttribute('description');
        const el_description = document.createElement('div');
        el_description.className = 'description';
        el_description.textContent = description;
        el_content.setAttribute('aria-label', description);
        el_content.appendChild(el_description);

        const el_links_block = document.createElement('div');
        el_links_block.className = 'links-block';
        el_content.appendChild(el_links_block);

        const github_link = this.getAttribute('github-link');
        if (github_link != null) {
            const el_github_link = document.createElement('a');
            el_github_link.className = 'github-link';
            el_github_link.setAttribute('alt', 'GitHub project source');
            el_github_link.setAttribute('aria-label', 'GitHub project source');
            el_github_link.setAttribute('height', '32');
            el_github_link.setAttribute('width', '32');
            el_github_link.href = github_link;
            el_github_link.onclick = (e) => e.stopPropagation();
            el_github_link.setAttribute('target', '_blank');
            el_links_block.appendChild(el_github_link);
        }

        const el_style = document.createElement('link');
        el_style.setAttribute('rel', 'stylesheet');
        el_style.setAttribute('href', '/components/the-post/style.css');

        shadow.appendChild(el_style);
        shadow.appendChild(el_content);

        this.onclick = (e) => {
            e.stopPropagation();
            window.open(this.getAttribute('demo-link'), '_self');
        };
    }
}

customElements.define('the-post', ThePost);
