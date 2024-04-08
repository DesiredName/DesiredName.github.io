const CACHE_ID = 23;
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
            ),
    );
});

self.addEventListener('fetch', (e) => {
    const request = e.request;

    async function lookup() {
        const cached = await caches.match(request);

        if (cached != null) {
            return cached;
        } else {
            try {
                return await fetch(request, {
                    signal: AbortSignal.timeout(5000),
                });
            } catch (error) {
                if (
                    request.mode === 'navigate' &&
                    !request.url.endsWith(OFFLINE_URL)
                ) {
                    return Response.redirect(OFFLINE_URL);
                } else {
                    return Response.error();
                }
            }
        }
    }

    e.respondWith(lookup());
});
