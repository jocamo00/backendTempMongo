const mongoose = require('mongoose')
const {companySchema} = require('./companies')

//#region Definición del schema car con validaciones
const carSchema = new mongoose.Schema({
    /*//normalizado
    company: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'companies' // el nombre que le hemos dado en el modelo
    },*/

    company: {
        type: companySchema,
        required: true
    },
    model: String,
    sold: Boolean,
    price: {
        type: Number,
        required: function() {               // Si ha sido vendido el precio no hace falta
        }
    },
    year: {
        type: Number,
        min: 2000,
        max: 2030,
    },
    extras: [String],
    date: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo (hace referencia a la collection de mongoDB)
  const Car = mongoose.model('car', carSchema)
  //#endregion


  module.exports = Car