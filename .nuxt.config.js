module.exports = {
    loading: false,
    modules: ['nuxt-sass-resources-loader'],
    head: {
        titleTemplate: '%s - SnO2WMaN.Graphics',
        meta: [{ charset: 'utf-8' }],
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Montserrat:300,400|Noto+Sans+JP:400,500',
            },
        ],
    },
    css: ['minireset.css'],
    sassResources: ['mathsass', 'sass-metallic-ratio'],
    routes: [
        {
            name: 'index',
            path: '/',
            component: 'pages/index.vue',
        },
    ],
}
