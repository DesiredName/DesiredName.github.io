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
    telemetry: true,
});
