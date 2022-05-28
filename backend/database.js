const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true//para que no nos bote error por pantalla
})//luego de conectarse le digo con then que haga lo siguiente
   .then(db => console.log('DB is connect'))//si todo sale bien el then se ejecutará, que obtendré un objete llamado db
   //y sólo muestro por consola que la DB se conectó correctamente
   .catch(err => console.error(err))//si todo sale mal el catch se ejecutará, capturo el error con catch y lo muestro por la consola