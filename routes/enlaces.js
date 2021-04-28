const express = require("express");
const enlacesController = require("../controllers/enlacesController");
const router = express.Router();
const auth= require('../middleware/auth')
const { check } = require("express-validator");
const archivosController = require("../controllers/archivosController");

router.post('/', 
[
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty()
],
auth, enlacesController.nuevoEnlace)
router.get('/:url', enlacesController.obtenerEnlace, archivosController.eliminarArchivo)
module.exports =router;