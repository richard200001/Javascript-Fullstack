const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   // mode: 'development',
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname,'backend/public'),
        filename: 'js/bundle.js'//que lo coloque dentro de una carpeta llamada js, como no existe, él la crea
    },
    module: {
        rules:  [
              {
                  test: /\.css$/,
                  use: [ 
                          devMode ? 'style-loader': MiniCssExtractPlugin.loader,//pregunta en que modo está
                          //si está en desarrollo carga los estilos dentro del javascript
                          //si estoy en producción cargalo en sus propios archivos css, o sea, a parte
                           'css-loader']
              }
          ]
      },
      //el html no se coloca dentro de ninguna carpeta, porque el navegador lo necesita solito
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify:{
                collapseWhitespace: true, //quita los espacios del código html
                removeComments: true,//quita los comentarios del código html
                removeRedundantAttributes: true,//quita el código redundante de html
                removeScriptTypeAttributes: true,//remueve el tipo de los atributos de los scripts en hmtl
                removeStyleLinkTypeAttributes: true,//remueve los atributos de las etiquetas link
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'//que lo coloque dentro de una carpeta llamada css, como no existe, él la crea
        }),
    ],
    devtool: 'source-map'//es para que me diga los errores
}