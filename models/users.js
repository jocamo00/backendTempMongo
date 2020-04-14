const mongoose = require('mongoose')

//#region Definición del schema user con validaciones
const userSchema = new mongoose.Schema({
    name: {
        type: String,                       // tipo de dato
        required: true,                     // si es obligatorio
    },
    isCustomer: Boolean,
    email: String,
    date: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo (hace referencia a la collection de mongoDB)
  const User = mongoose.model('user', userSchema)
  //#endregion


  module.exports = User