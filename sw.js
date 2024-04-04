const CACHE_ID = 15;
const OFFLINE_URL = '/no-connection.html';

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
                    OFFLINE_URL,
                    '/assets/colors.css',
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
                ]),
            ),
    );
});

self.addEventListener('fetch', (e) => {
    const request = e.request;

    async function lookup() {
        const cached = await caches.match(request);
        const fetched = () =>
            fetch(request, {
                signal: AbortSignal.timeout(5000),
            }).catch(() => {
                if (e.request.mode === 'navigate') {
                    return caches.match(OFFLINE_URL);
                } else {
                    return undefined;
                }
            });

        return cached ?? fetched();
    }

    e.respondWith(lookup());
});
