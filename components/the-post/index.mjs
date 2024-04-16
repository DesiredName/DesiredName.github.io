import fetch_template from '/utils/fetch-template.mjs';

class ThePost extends HTMLElement {
    static observedAttributes = ['title', 'repo-link', 'description'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');

        fetch_template('/components/the-post/index.html')
            .then((template) => {
                shadow.innerHTML = template;

                return shadow.querySelector('div.the-post');
            })
            .then(update_title.bind(this, title))
            .then(update_description.bind(this, description))
            .then(
                add_links.bind(this, title, {
                    github: this.getAttribute('github-link'),
                    leetcode: this.getAttribute('leetcode-link'),
                }),
            );

        this.onclick = (e) => {
            e.stopPropagation();
            location.href = this.getAttribute('demo-link');
        };
    }
}

async function update_title(title, el_content) {
    const el_title = el_content.querySelector('div.title');
    el_title.className = 'title';
    el_title.textContent = title;

    el_content.ariaLabel = `demo example for ${title} post`;

    return Promise.resolve(el_content);
}

async function update_description(description, el_content) {
    const el_description = el_content.querySelector('div.description');
    el_description.textContent = description;

    return Promise.resolve(el_content);
}

async function add_links(
    link_common_title,
    { github: github_link, leetcode: leetcode_link },
    el_content,
) {
    const el_links_block = el_content.querySelector('div.links-block');

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
