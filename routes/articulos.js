let express = require('express');
let router = express.Router();
let db = require('../public/javascripts/db')

router.get('/creartabla', function (req, res, next) {
  db.query('DROP TABLE IF EXISTS articulos', (error, resultado) => {
    if (error)
      console.log(error)
  })

  //*******************************************CREAR LA TABLA ARTICULOS*******************************************
  db.query(`CREATE TABLE articulos (
    id int primary key auto_increment,
    nombre varchar(30),
    precio float)`, (error, resultado) => {
    if (error)
      console.log(error)
    return
  })

  res.render('mensaje', { mensaje: 'La tabla se creo correctamente' })
})

//*******************************************DAR DE ALTA UN ARTICULO*******************************************
router.get('/alta', function (req, res, next) {
  res.render('articulos_alta')
})

router.post('/alta', (req, res, next) => {
  const articulo = {
    nombre: req.body.nombre,
    precio: req.body.precio
  }

  db.query('INSERT INTO articulos SET ?', articulo, (error, resultado) => {
    if (error) {
      console.log(error + "\n")
      return
    }
  })
  res.render('mensaje', { mensaje: 'Articulo insertado correctamente' })
})

//*******************************************MOSTRAR LISTADO DE ARTICULOS*******************************************
router.get('/listado', (req, res, next) => {
  db.query('SELECT id, nombre, precio FROM articulos', (error, filas) => {
    if (error) {
      console.log('Error en el listado')
      return
    }
    res.render('articulos_listado', { articulos: filas })
  })
})

//*******************************************MODIFICAR UN ARTICULO*******************************************
router.get('/modificacion', (req, res, next) => {
  res.render('articulos_modificar')
})

router.post('/modificacion', (req, res, next) => {
  const articulo = [
    req.body.precio,
    req.body.id
  ]
  db.query('UPDATE articulos SET precio = ? WHERE id = ?', articulo, (error, resultado) => {
    if (error) {
      console.log(error + "\n")
      return
    }
  })
  res.render('mensaje', { mensaje: 'Articulo modificado correctamente' })
})

//*******************************************ELIMINAR UN ARTICULO*******************************************
router.get('/borrar', (req, res, next) => {
  res.render('articulos_borrar')
})

router.post('/borrar', (req, res, next) => {
  const articulo = [
    req.body.id
  ]
  db.query('DELETE FROM articulos WHERE id = ?', articulo, (error, resultado) => {
    if (error) {
      console.log(error + "\n")
      return
    }
  })
  res.render('mensaje', { mensaje: 'Articulo borrado' })
})

//***********************************************************************************************************
router.get('/', function (req, res, next) {
  res.render('mensaje', { mensaje: 'No se encuentra el recurso.' });
});

module.exports = router;
