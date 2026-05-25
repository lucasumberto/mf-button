// webpack.config.js (Remote App)
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
    // Modo de desenvolvimento para facilitar debugging
    mode: 'development',
    devServer: {
        port: 3001, // Porta onde o remoto será servido
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'remoteApp', // Nome do módulo remoto
            filename: 'remoteEntry.js', // Nome do arquivo de entrada
            exposes: {
                './Button': './src/App.tsx', // Caminho do componente a ser exposto
            },
            shared: {
                // Dependências a serem compartilhadas com o host
                react: { singleton: true, requiredVersion: deps.react },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};