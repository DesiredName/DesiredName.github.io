// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        rootId: 'the-main-content',
        rootTag: 'main',
    },
    css: ['./assets/scss/index.scss'],
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/color-mode',
        [
            '@nuxtjs/google-fonts',
            {
                display: 'swap',
                families: {
                    Roboto: { wght: [100, 400, 700] },
                },
                preload: true,
                useStylesheet: true,
            },
        ],
    ],
    telemetry: true,
});
