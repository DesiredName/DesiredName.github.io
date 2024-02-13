// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        rootId: 'the-main-content',
        rootTag: 'main',
    },
    css: ['./assets/scss/index.scss'],
    devtools: { enabled: true },
    modules: [
        'nuxt-icon',
        [
            '@nuxt/content',
            {
                navigation: {
                    fields: [
                        'description',
                        'tags',
                        'date',
                        'year',
                        'month',
                        'day',
                        'order',
                    ],
                },
                highlight: {
                    theme: 'github-light',
                    preload: ['js'],
                },
            },
        ],
        [
            '@nuxtjs/color-mode',
            {
                preference: 'system',
                fallback: 'dark',
            },
        ],
        [
            '@nuxtjs/google-fonts',
            {
                display: 'swap',
                families: {
                    Roboto: { wght: [100, 300, 700] },
                },
                preload: true,
                useStylesheet: true,
            },
        ],
    ],
    routeRules: {
        '**': { prerender: true },
    },
    telemetry: true,
});
