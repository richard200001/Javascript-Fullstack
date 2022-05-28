import BookService from './services/BookService'
import { format } from 'timeago.js';//a format le damos la fecha y la convierte en 2 minutos atras, hace 2 dias y así
const bookService = new BookService();// creo un nuevo libro 
class UI{
    async renderBook(){//pinta todos los libros por pantalla
            const books = await bookService.getBooks();
            const booksCardContainer = document.getElementById('books-cards');
            booksCardContainer.innerHTML = '';//limpiamos el contenedor
            books.forEach((book) => {//empezamos a recorrer los libros que hay en el arreglo
            const div = document.createElement('div');//creamos un contenedor div
            div.className = 'animated fadeInRight';//le damos el valor a la clase del div
            div.innerHTML = `
            <div class="card m-2">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="http://localhost:5000${book.imagePath}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-block px-2">
                            <h4 class="card-title">${book.title}</h4>
                            <p class="card-text">${book.author}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x-square danger delete" _id="${book._id}" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </div>
                    </div>
                </div>
                <div class="card-footer w-100 text-muted">
                ${format(book.created_at)}
                </div>
            </div>
            `;//a format le damos la fecha y la convierte en 2 minutos atras, hace 2 dias y así
            booksCardContainer.appendChild(div);// va agregando cada div al contenedor
            });
  }
    async addANewBook(book){//Agrega un nuevo libro
       await bookService.postBook(book);//guardo el libro
        this.clearBookForm();
        this.renderBook();
    }

    clearBookForm(){//Limpia el formulario
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){//Renderiza un mensaje, tiene por parámetros
        //el mensaje que quiero que muestre, es decir las letras el string la cadena de texto que quiero que se vea
        //el color del mensaje, y los segundos que quiero que pasen, para que remueva el mensaje
        // Creating a div
        const div = document.createElement('div');//creo el div
        // Styling the div
        div.className = `alert alert-${colorMessage} message`;//le doy el color al mensaje/div
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));//añado el texto al div, es decir, el mensaje que quiero que aparezca
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');//selecciono el contenedor
        const bookForm = document.querySelector('#book-form');//selecciono el formulario
        container.insertBefore(div, bookForm);//aquí le digo que quiero que coloque el div entre el contenedor y el formulario
        //desde el contenedor coloca el div antes del formulario
        // Removing the div after some secconds
        setTimeout(() => {//setTimeout ejecuta una función pasado algunos segundo
        document.querySelector('.message').remove();//primero selecciono el elemento que tenga la clase message, que es el mensaje que vamos a remover, y con remove lo remuevo
        }, secondsToRemove);//luego le coloco los segundos que quiero que pasen para que ejecute la función de remover el mensaje
    }

    async deleteBook(bookId){//quita un elemento de la pantalla
        await bookService.deleteBook(bookId);//elimino el libro
        this.renderBook();//renderizo de nuevo los libros
    }
}

export default UI;