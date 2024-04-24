export default async function fetch_template(url) {
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
    })
        .then((res) =>
            res.ok ? res.text() : '<div class="fetch_failed"></div>',
        )
        .then((html) => html);
}
