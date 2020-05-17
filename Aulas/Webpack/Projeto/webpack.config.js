const path = require('path');
const webpack = require('webpack');
const modoDev = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',

    output:{
        filename:'principal.js',
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    optimization:{
        minimizer:[
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
              }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"estilo.css"
        })
    ],
    module:{
        rules:[{
            test:/\.s?[ac]ss$/,  //.css .sass.scss
            use:[
                MiniCssExtractPlugin.loader, //externaliza o css
                //'style-loader',  Adiciona o CSS a DOM injetando a tag <style>
                'css-loader', //interpreta @import, url()...
                'sass-loader',
            ]
        },{
            test:/\.(png|svg|jpg|gif)$/,
            use:['file-loader']
        }]
    }
}