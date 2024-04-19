const CACHE_ID = '125';
const OFFLINE_URL = '/no-connection.html';

console.log(`starting service worker #${CACHE_ID}`);

const to_cache = [
    '/',
    '/index.html',
    '/site.webmanifest',
    OFFLINE_URL,
    '/assets/colors.css',
    '/assets/demo-commons.css',
    '/assets/elements-common.css',
    '/assets/close.svg',
    '/assets/github-mark-white.svg',
    '/assets/leetcode.png',
    '/assets/LI-In-Bug.png',
    '/components/the-post/index.html',
    '/components/the-post/index.mjs',
    '/android-chrome-144x144.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/favicon.ico',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
];

async function stale_with_revalidate(request, is_offline_page) {
    try {
        const from_cache = caches.match(request);
        const from_network = fetch(request, {
            signal: AbortSignal.timeout(5000),
        }).then(async (res) => {
            if (res.ok) {
                const clone = res.clone();

                caches.open(CACHE_ID).then((cache) => {
                    cache.put(request, clone);
                });
            }

            return res;
        });

        return (await from_cache) || (await from_network);
    } catch (ex) {
        if (request.mode === 'navigate') {
            if (is_offline_page) {
                return Response.error();
            } else {
                return Response.redirect(OFFLINE_URL);
            }
        } else {
            return Response.error();
        }
    }
}

self.addEventListener('install', (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_ID);
            await cache.addAll(to_cache);

            return self.skipWaiting();
        })(),
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) =>
                keys.forEach((key) => {
                    key != CACHE_ID ? caches.delete(key) : null;
                }),
            )
            .then(() => clients.claim()),
    );
});

self.addEventListener('fetch', (e) => {
    const request = e.request;
    const url = new URL(request.url);
    const is_offline_page = url.pathname.endsWith(OFFLINE_URL);

    if (/^https?:/.test(url.protocol) !== true) {
        return;
    }

    e.respondWith(stale_with_revalidate(request, is_offline_page));
});
