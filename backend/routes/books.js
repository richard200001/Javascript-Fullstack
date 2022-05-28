const {Router} = require('express');
const {unlink} = require('fs-extra');//este módulo se encarga de mover archivos, eliminarlos, crearlos
//en este caso solamente importo el método unlink, que es de eliminar, pues es el único que necesito
const path = require('path');

const router = Router();
const Book = require('../models/Book');//en la constante Book guardo mi modelo de datos Book
//este modelo, sirve, para consultar, guardar, eliminar y hacer muchas funciones con la base de datos

router.get('/', async(req, res) => {
 const books = await Book.find();//hago una consulta a la base de datos, o sea, por medio del modelo
 //consultamos la base de datos
 res.json(books);//enviamos un en un json la consulta a la vista
});

router.post('/', async(req, res) => {
    const {title, author, isbn} = req.body;//obtego los datos
    const imagePath = '/uploads/' + req.file.filename;//en esta constante almaceno la ruta donde se guarda la imagen
    const newBook = new Book({title, author, isbn, imagePath});//creo un nuevo libro y le paso los datos recolectados actualmente a ese libro que acabo de crear
    await newBook.save();
    res.json({message: 'Book Saved'});
   });  
   
router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);//esta línea de código elimina la dirección de la imagen de nuestra base de datos
    unlink(path.resolve('./backend/public'+ book.imagePath));//resolve es un método de path que me ubica desde el inicio o origen de mi proyecto la dirección
    //esta línea anterior lo que va a hacer es eliminar los archivos que se borraron desde la vista, los elimina del servidor
    res.json({message: 'book deleted'})
})

module.exports=router;