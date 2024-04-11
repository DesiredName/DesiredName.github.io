const CACHE_ID = 61;
const OFFLINE_URL = '/no-connection.html';
let req_id = 0;

console.log(`starting service worker ${CACHE_ID}`);

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) => keys.forEach((key) => caches.delete(key)))
            .then(() => caches.open(CACHE_ID))
            .then((cache) =>
                cache.addAll([
                    '/',
                    '/index.html',
                    '/site.webmanifest',
                    OFFLINE_URL,
                    '/assets/colors.css',
                    '/assets/elements-common.css',
                    '/assets/github-mark-white.svg',
                    '/assets/leetcode.png',
                    '/assets/LI-In-Bug.png',
                    '/assets/style.css',
                    '/components/the-post/index.mjs',
                    '/components/the-post/style.css',
                    '/android-chrome-144x144.png',
                    '/android-chrome-192x192.png',
                    '/android-chrome-512x512.png',
                    '/apple-touch-icon.png',
                    '/favicon-32x32.png',
                    '/favicon-16x16.png',
                ]),
            )
            .then(() => clients.claim()),
    );
});

self.addEventListener('fetch', (e) => {
    const request = e.request;
    const url = new URL(request.url);

    async function lookup() {
        const id = req_id++;
        const cached = await caches.match(request);

        console.log(`${id}: requesting "${url}"`);

        if (cached != null) {
            console.log(`${id}: found in cache`);
            return cached;
        } else {
            const signal = AbortSignal.timeout(5000);

            return fetch(request, { signal })
                .then((res) => {
                    console.log(
                        `${id}: request resolved with network [${res.ok}]`,
                    );
                    return res;
                })
                .catch((error) => {
                    console.log(`${id}: request failed "${error}"`);
                    if (
                        request.mode === 'navigate' &&
                        !url.pathname.endsWith(OFFLINE_URL)
                    ) {
                        console.log(`${id}: redirect to offline page`);
                        return Response.redirect(OFFLINE_URL);
                    } else {
                        console.log(`${id}: return error response`);
                        return Response.error();
                    }
                });
        }
    }

    e.respondWith(lookup());
});
