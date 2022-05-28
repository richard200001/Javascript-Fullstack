class BookService {

    constructor() {
        this.URI = `http://localhost:5000/api/books`;
    }

    async getBooks() {//este método obtiene los libros existentes
        const response = await fetch(this.URI);    //la función fetch por defecto hace una petición get, es decir, nos trae datos pero en forma de string
        const books = await response.json();//convertimos los datos tipo string en json
        return books;//returnamos la respuesta
    }

    async postBook(book) {//cuendo ejecutemos este método le pasaremos un libro, este método guarda los libros
        const res = await fetch(this.URI, {
            method: 'POST',//le digo que el método es post
            body: book//le pasamos el libro al backend, es decir todos sus atributos, pues es un objeto
        });
        const data = await res.json();//convertimos la respuesta que envía el backend en json
        console.log(data);
    }

    async deleteBook(bookId) {//este método elimina los libros, le pasamos el id del libro que queramos eliminar
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',//Escribimos esta línea porque sólo vamos a enviar un sólo dato, al igual que lo hacíamos con postman
            },
            method: 'Delete'
        });
        const data = await res.json();
        console.log(data);
    }

}

export default BookService;