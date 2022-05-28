require('./styles/app.css');
import UI from './UI' 

document.addEventListener('DOMContentLoaded', () => {//el evento DOMContentLoaded es cuando la página carga
    const ui = new UI();
    ui.renderBook();
  });

document.getElementById('book-form')
  .addEventListener('submit', function(e) {//evento submit es cuando oprime el botón de guardar

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    const formData = new FormData();//creo un formulario de datos, y con el append le agrego todos los datos
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addANewBook(formData);//le paso los datos a la interfaz
    ui.renderMessage('New Book Added', 'success', 3000);//aquí le digo que después de añadir el libro coloque el
    //mensaje de nuevo libro añadido, que sea de color verde y que dure 3 segundos

    e.preventDefault();
  })

document.getElementById('books-cards')
  .addEventListener('click', e => {//captura el click que se de en el contenedor
    if (e.target.classList.contains('delete')) {//le digo que si doy click en un elemento que tenga la clase delete que haga tal cosa
        const ui = new UI();    
        ui.deleteBook(e.target.getAttribute('_id'));//le paso el id del libro a la ui para que se lo pase al servicio, para que elimine el libro
        ui.renderMessage('Book Deleted Successfully', 'success', 5000);//aquí le digo que después de eliminar el libro coloque el
        //mensaje de libro eliminado satisfactoriamente, color verde y que dure 5 segundos
    }
    e.preventDefault();
  });