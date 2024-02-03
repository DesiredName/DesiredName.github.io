// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['./assets/scss/index.scss'],
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/color-mode',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Roboto: { wght: [100, 400, 700] },
                },
                display: 'swap',
                preconnect: true,
            },
        ],
    ],
});
