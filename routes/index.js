var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Menú principal' });
});

router.get('/clientes', function(req, res, next) {
  res.render('clientes_index');
});

router.get('/articulos', function(req, res, next) {
  res.render('articulos_index');
});

module.exports = router;
