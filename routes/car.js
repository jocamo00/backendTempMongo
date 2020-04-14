const mongoose = require('mongoose')
const express = require('express');
const Car = require('../models/cars')
const {Company} = require('../models/companies')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los coches
router.get('/', async(req, res)=> {
  const cars = await Car
  .find()
  /*// Normalizado
  Company.populate(cars, {path: 'company'},function(err,company){
    res.send(cars)
  })*/
  res.send(cars)
}) 
//#endregion


//#region Introducir coche POST Modelo de datos Embebido
router.post('/', [
  //Checkea los datos que nos llegan
  check('model').isLength({min: 3}) 
], async (req, res)=> {
  
  //Analiza los resultados de la validación del request
  const errors = validationResult(req);
  //Si error llega distinto que vacio es que a encontrado algun error
  if (!errors.isEmpty()) {
    //Devuelve un 422 y en formato json el error
    return res.status(422).json({ errors: errors.array() });
  }

  // Comprovamos de que existe y lo recogemos
  const company = await Company.findById(req.body.companyId)
  if(!company) return res.status(400).send('No tenemos ese fabricante')
  
  const car = new Car({
    company: company,
    model: req.body.model,
    year: req.body.year,
    sold: req.body.sold,
    price: req.body.price,
    extras: req.body.extras
  })

  // Guarda el coche
  const result = await car.save()
  res.status(201).send(result)
})
//#endregion


//#region  Listar coche por id
router.get('/:id', async(req, res) => {
  // recoje el id de la url
  const car = await Car.findById(req.params.id)
  if(!car) return res.status(404).send('No hemos encontrado un coche con ese ID')
  res.send(car)
})
//#endregion

  
//#region Introducir coche POST Modelo de datos Normalizado
/*router.post('/', [
  //Checkea los datos que nos llegan
  check('model').isLength({min: 3}) 
], async (req, res)=> {
  
  //Analiza los resultados de la validación del request
  const errors = validationResult(req);
  //Si error llega distinto que vacio es que a encontrado algun error
  if (!errors.isEmpty()) {
    //Devuelve un 422 y en formato json el error
    return res.status(422).json({ errors: errors.array() });
  }
  
  const car = new Car({
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    sold: req.body.sold,
    price: req.body.price,
    extras: req.body.extras
  })

  // Guarda el coche
  const result = await car.save()
  
  res.status(201).send(result)
})*/
//#endregion
  

//#region Editar el coche seleccionado por id  
router.put('/:id', [
  //Checkea los datos que nos llegan
  check('model').isLength({min: 3}) //checkea longitud minima
], async (req, res)=> {
  
  //Analiza los resultados de la validación del request
  const errors = validationResult(req);
  //Si error llega distinto que vacio es que a encontrado algun error
  if (!errors.isEmpty()) {
    //Devuelve un 422 y en formato json el error
    return res.status(422).json({ errors: errors.array() });
  }
  
  const car = await Car.findByIdAndUpdate(req.params.id, {
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    sold: req.body.sold,
    price: req.body.price,
    extras: req.body.extras
  },
  {
    // Devuelve el documento modificado
    new: true
  })
  
  //si no existe el coche
  if(!car){
    return res.status(404).send('El coche con ese ID no esta');
  }
  
  res.status(204).send(car)
})
//#endregion  


//#region Delete coche por id  
router.delete('/:id', async (req, res) => {

  const car = await Car.findByIdAndDelete(req.params.id)
  
  if(!car){
    return res.status(404).send('El coche con ese ID no esta, no se puede eliminar');
  }
  
  res.status(200).send('coche borrado');
})
//#endregion


module.exports = router;