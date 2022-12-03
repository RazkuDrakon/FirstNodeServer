let express = require('express');
let router = express.Router();
let db = require('../public/javascripts/db')

//*******************************************CREAR LA TABLA CLIENTES*******************************************
router.get('/creartablacliente', function (req, res, next) {
db.query('DROP TABLE IF EXISTS clientes', (error, resultado) => {
    if (error)
        console.log(error)
    })
    
db.query(`CREATE TABLE clientes (
    id int primary key auto_increment,
    nombre varchar(30),
    telefono numeric,
    categoria int(1))`, (error, resultado) => {
        if (error)
            console.log(error)
            return
        })
    
    res.render('mensaje', { mensaje: 'La tabla se creo correctamente' })
})

//*******************************************DAR DE ALTA UN CLIENTE*******************************************
router.get('/alta', function (req, res, next) {
  res.render('clientes_alta')
})

router.post('/alta', (req, res, next) => {
    if(req.body.cat >=1 && req.body.cat<=4){
        const articulo = {
            nombre: req.body.nombre,
            telefono: req.body.tlf,
            categoria: req.body.cat
          }
          db.query('INSERT INTO clientes SET ?', articulo, (error, resultado) => {
            if (error) {
              console.log(error + "\n")
              return
            }
          })
          res.render('mensaje', { mensaje: 'Cliente insertado correctamente' })
    }else{
        res.render('clientes_error')
    }
})

//*******************************************MOSTRAR LISTADO DE CLIENTES*******************************************
router.get('/listado', (req, res, next) => {
    db.query('SELECT id, nombre, telefono, categoria FROM clientes', (error, filas) => {
      if (error) {
        console.log('Error en el listado')
        return
      }
      res.render('clientes_listado', { clientes: filas })
    })
  })

//***********************************************************************************************************
router.get('/', function (req, res, next) {
    res.render('mensaje', { mensaje: 'No se encuentra el recurso.' });
});
module.exports = router;