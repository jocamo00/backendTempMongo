const mongoose = require('mongoose')
const express = require('express');
const Sale = require('../models/sales')
const Car = require('../models/cars')
const User = require('../models/users')
const router = express.Router();



//#region Listar todas las ventas
router.get('/', async(req, res)=> {
  const sales = await Sale.find()
  res.send(sales)
}) 
//#endregion
  

  
//#region Introducir user
router.post('/', async (req, res)=> {

  // Comprueba que el id del usuario es correcto
  const user = await User.findById(req.body.userId)
  if(!user) return res.status(400).send('Usuario no existe')
  
  // Comprueba que el id del coche es correcto
  const car = await Car.findById(req.body.carId)
  if(!car) return res.status(400).send('Coche no existe')

  // Comprueba que el coche no haya sido vendido
  if(car.sold === true) return res.status(400).send('Ese coche ya ha sido vendido')


  const sale = new Sale ({
      user: {
          _id: user._id,
          name: user.name,
          email: user.email
      },
      car: {
          _id: car._id,
          model: car.model
      },
      price: req.body.price
  })
  /*// Guarda la venta
  const result = await sale.save()
  user.isCustomer = true
  user.save()
  car.sold = true
  car.save()
  res.status(201).send(result)*/

  // Para asegurar que se hacen correctamente los diferentes guardados lo encapsulamos en una transacción
  // Si hubiera algun fallo la transacción no se haria
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const result = await sale.save()
    user.isCustomer = true
    user.save()
    car.sold = true
    car.save()

    await session.commitTransaction()
    session.endSession()

    res.status(201).send(result)
  } catch (e) {
      await session.abortTransaction()
      session.endSession()
      res.status(500).send(e.message)
  }
})
//#endregion
  


module.exports = router;