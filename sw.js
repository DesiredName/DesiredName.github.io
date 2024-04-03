const CACHE_ID = 2;

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
                    '/demo/web-workers/index.html',
                    '/demo/perceptron/index.html',
                    '/demo/no-axios-defined/index.html',
                    '/demo/modal-made-easy/index.html',
                    '/assets/colors.css',
                    '/assets/style.css',
                    '/assets/demo-commons.css',
                    '/components/the-post/index.mjs',
                    '/components/the-post/style.css',
                    '/components/return-button/index.mjs',
                    '/components/return-button/style.css',
                ]),
            ),
    );
});

self.addEventListener('fetch', (e) => {
    const request = e.request;

    async function lookup() {
        const cached = await caches.match(request);

        return cached ?? fetch(request);
    }

    e.respondWith(lookup());
});
