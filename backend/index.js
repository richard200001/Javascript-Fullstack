if(process.env.NODE_ENV === 'development'){//si estamos en desarrollo requierelo, de lo contrario no lo requieras
    require('dotenv').config();
    console.log(process.env.NODE_ENV)
}


const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Initialize
const app = express();
require('./database')

//Settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({//en la constante storage almaceno las imagenes
    destination: path.join(__dirname, 'public/uploads'),//aquí le digo donde va a colocar las imagenes
    //a demás de decirle donde va a colocar las imágenes, también le decimos que si no existen esas carpetas
    //que las cree y guarde en ellas las images
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));//con el callback le digo en el primer parámetro null que significa
        //que no hy error, y de egundo le paso un número que da la función newDate().getTime(), por último
        //le concateno la extensión con ayuda de extname que extrae la extención de el archivo, file contiene
        //el archivo y con el .originalname accedo al nombre completo del archivo
    }
})
app.use(multer({storage}).single('image'));//primer parámetro le paso las imagenes almacenadas, y de segundo 
//le digo que pase una sola imágen, porque se va a subir de a una sóla imágen
//a single le paso por parámetro el nombre del input en el cual subimos la imágen
app.use(express.urlencoded({extended: false}));//esta línea de código nos permitirá interpretar los datos que enviémos
//desde el frontend como si fueran json aquí en el backend
app.use(express.json());//esta línea de código sirve para decrile al backend que vamos a estar enviando y recibiendo datos json
//o sea, que podemos trabajar con AJAX
app.use(cors());//este cors permite que el backend y el frontend se puedan comunicar
//Routes
app.use('/api/books',require('./routes/books'));//el /api/books es una ruta de mi api

//Static Files
app.use(express.static(path.join(__dirname,'public')));//así hago pública mi carpeta public


//Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})