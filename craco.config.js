const CracoLessPlugin = require('craco-less');
const path = require('path');
const theme  = require('./src/assets/style/theme.js');
const sassResourcesLoader = require('craco-sass-resources-loader');

function resolve (dir) {
    console.log(path.join(__dirname, dir))
    return path.join(__dirname, dir)
}

module.exports = {
   webpack:{
       alias: {
           '@src':resolve('src'),
           "@public": resolve("public"),
           "@assets": resolve("src/assets"),
           "@common": resolve("src/common"),
           "@components": resolve("src/components"),
           "@router": resolve("src/router"),
           "@store": resolve("src/store"),
           "@utils": resolve("src/utils")
       }
   },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: theme,
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                    resolve('./src/assets/style/_var.scss'),
                    resolve('./src/assets/style/mixin.scss')
                ],
            },
        }
    ],
};