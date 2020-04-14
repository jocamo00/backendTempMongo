//#region require
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const car = require('./routes/car');
const user = require('./routes/user');
const company = require('./routes/company');
const sale = require('./routes/sale');
//#endregion


//Recoje la petición y la convierte en JSOn
app.use(express.json());
app.use('/api/cars/', car);
app.use('/api/users/', user);
app.use('/api/companies/', company);
app.use('/api/sales/', sale);


//#region Configuración del puerto
//Si nos asignan una variable de puerto usamos la que nos asignen,
//que no nos han asiganado nada usamos 3000
const port = process.env.PORT || 3000;
 
app.listen(port, ()=> console.log(`Escuchando Puerto ${port}`))
//#endregion

//#region Conexión a la BD
mongoose.connect('mongodb://localhost:27017/carsdb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectarse a MongoDB'))
//#endregion