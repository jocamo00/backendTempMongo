const mongoose = require('mongoose')

//#region Definición del schema company con validaciones
const companySchema = new mongoose.Schema({
    name: {
        type: String,                       // tipo de dato
        required: true,                     // si es obligatorio
        minlength: 1,                       // minima longitud 2 caracteres
        maxlength: 99,                      // maxima longitud 99 caracteres
    },
    country: String,
    date: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo (hace referencia a la collection de mongoDB)
  const Company = mongoose.model('company', companySchema)
  //#endregion


  module.exports.Company = Company
  module.exports.companySchema = companySchema
  