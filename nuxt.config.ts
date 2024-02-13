// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        rootId: 'the-main-content',
        rootTag: 'main',
    },
    css: ['./assets/scss/index.scss'],
    devtools: { enabled: false },
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
                    theme: {
                        default: 'github-light',
                        dark: 'github-dark',
                        light: 'github-light',
                    },
                    langs: ['js', 'css'],
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
                    'Roboto Slab': { wght: [100, 300, 700] },
                },
                preload: true,
                useStylesheet: true,
            },
        ],
    ],
    telemetry: true,
});
