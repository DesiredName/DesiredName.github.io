class ThePost extends HTMLElement {
    static observedAttributes = ['title', 'repo-link', 'description'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const title = this.getAttribute('title');

        add_content(shadow)
            .then(add_title.bind(this, title))
            .then(add_description.bind(this, this.getAttribute('description')))
            .then(
                add_links.bind(this, title, {
                    github: this.getAttribute('github-link'),
                    leetcode: this.getAttribute('leetcode-link'),
                }),
            );

        add_style_element(shadow);

        this.onclick = (e) => {
            e.stopPropagation();
            location.href = this.getAttribute('demo-link');
        };
    }
}

async function add_content(shadow) {
    const el_content = document.createElement('div');
    el_content.className = 'the-post';
    shadow.appendChild(el_content);

    return Promise.resolve(el_content);
}

async function add_style_element(shadow) {
    const el_style = document.createElement('link');
    el_style.setAttribute('rel', 'stylesheet');
    el_style.setAttribute('href', '/components/the-post/style.css');

    shadow.appendChild(el_style);
}

async function add_title(title, el_content) {
    const el_title = document.createElement('div');
    el_title.className = 'title';
    el_title.textContent = title;
    el_content.setAttribute('aria-label', `demo example for ${title} post`);
    el_content.appendChild(el_title);

    return Promise.resolve(el_content);
}

async function add_description(description, el_content) {
    const el_description = document.createElement('div');
    el_description.className = 'description';
    el_description.textContent = description;
    el_content.setAttribute('aria-label', description);
    el_content.appendChild(el_description);

    return Promise.resolve(el_content);
}

async function add_links(
    link_common_title,
    { github: github_link, leetcode: leetcode_link },
    el_content,
) {
    const el_links_block = document.createElement('div');
    el_links_block.className = 'links-block';
    el_content.appendChild(el_links_block);

    function create_link_icon(link, description, icon_class) {
        if (link == null) {
            return;
        }

        const compound_aria_alt_text = `${link_common_title} - ${description}`;
        const el_link_icon = document.createElement('a');

        el_link_icon.className = `ext-link ${icon_class}`;
        el_link_icon.setAttribute('alt', compound_aria_alt_text);
        el_link_icon.setAttribute('title', compound_aria_alt_text);
        el_link_icon.setAttribute('aria-label', compound_aria_alt_text);
        el_link_icon.setAttribute('height', '32');
        el_link_icon.setAttribute('width', '32');
        el_link_icon.href = link;
        el_link_icon.onclick = (e) => e.stopPropagation();
        el_link_icon.setAttribute('target', '_blank');

        el_links_block.appendChild(el_link_icon);
    }

    create_link_icon(
        leetcode_link,
        'LeetCode problem description',
        'leetcode-link',
    );
    create_link_icon(github_link, 'GitHub project source', 'github-link');

    return Promise.resolve(el_content);
}

customElements.define('the-post', ThePost);
