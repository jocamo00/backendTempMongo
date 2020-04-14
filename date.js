function date (req, res, next){
    console.log('Time: ', Date.now())
    next() //Para que acabe y no se quede la aplicación bloqueada
}


module.exports = date