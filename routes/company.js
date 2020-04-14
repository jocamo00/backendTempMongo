const mongoose = require('mongoose')
const express = require('express')
const {Company} = require('../models/companies')
const router = express.Router()
const { check, validationResult } = require('express-validator')


//#region Listar tadas las companies
router.get('/', async(req, res)=> {
  const companies = await Company.find()
  res.send(companies)
}) 
//#endregion
  

//#region  Listar company por id
router.get('/:id', async(req, res) => {
  // recoje el id de la url
  const company = await Company.findById(req.params.id)
  if(!company) return res.status(404).send('No hemos encontrado una marca con ese ID')
  res.send(company)
})
//#endregion

  
//#region Introducir company 
router.post('/', async (req, res)=> {
  
  //Analiza los resultados de la validación del request
  const errors = validationResult(req);
  //Si error llega distinto que vacio es que a encontrado algun error
  if (!errors.isEmpty()) {
    //Devuelve un 422 y en formato json el error
    return res.status(422).json({ errors: errors.array() });
  }
  
  const company = new Company({
    name: req.body.name,
    country: req.body.country
  })

  // Guarda la company
  const result = await company.save()
  
  res.status(201).send(result)
})
//#endregion
  

//#region Editar la company seleccionada por id  
router.put('/:id', async (req, res)=> {
  
  //Analiza los resultados de la validación del request
  const errors = validationResult(req);
  //Si error llega distinto que vacio es que a encontrado algun error
  if (!errors.isEmpty()) {
    //Devuelve un 422 y en formato json el error
    return res.status(422).json({ errors: errors.array() });
  }
  
  const company = await Company.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    country: req.body.country
  },
  {
    // Devuelve el documento modificado
    new: true
  })
  
  //si no existe la company
  if(!company){
    return res.status(404).send('La marca con ese ID no esta');
  }
  
  res.status(204).send()
})
//#endregion  


//#region Delete company por id  
router.delete('/:id', async (req, res) => {

  const company = await Company.findByIdAndDelete(req.params.id)
  
  if(!company){
    return res.status(404).send('La marca con ese ID no esta, no se puede eliminar');
  }
  
  res.status(200).send('marca borrada');
})
//#endregion


module.exports = router;