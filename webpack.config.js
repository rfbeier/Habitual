const path = require('path');
const HTMLPlugIn = require('html-webpack-plugin');
const HTMLPlugInConstructed = new HTMLPlugIn({
    template: __dirname + '/index.html', //--> NECESSARY?
    filename: 'index.html',
    inject: 'body'
});

// HOW DOES NODEMONCONFIG WORK IN PACKAGE.JSON FILE?

console.log(process.env.NODE_ENV);

module.exports = ({
    entry: path.join(__dirname, '/client/index.js'),
    mode: process.env.NODE_ENV,
    module: {
        rules: [ // ADD CSS RULE W/ CSS-LOADER?
            { 
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
                    // "style-loader"
            }
        ]
    },
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [HTMLPlugInConstructed],
    devServer: {
        port:8080,
        proxy: {
            '/api': 'http://localhost:3000' // COMMA NEEDED?
        }
    }
});