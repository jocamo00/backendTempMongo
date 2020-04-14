const mongoose = require('mongoose')

//#region Definición del schema sale
const saleSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            name: String,
            email: String
        }),
        required: true
    },

    car: {
        type: new mongoose.Schema({
            model: String
        }),
        required: true
    },
    price: Number,
    date: {type: Date, default:Date.now}
  })
  //#endregion
  
  
  //#region Definición del modelo (hace referencia a la collection de mongoDB)
  const Sale = mongoose.model('sale', saleSchema)
  //#endregion


  module.exports = Sale

  