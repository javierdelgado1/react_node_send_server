const express = require("express");
const enlacesController = require("../controllers/enlacesController");
const router = express.Router();
const auth= require('../middleware/auth')
const { check } = require("express-validator");

router.post('/', 
[
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty()
],
auth, enlacesController.nuevoEnlace)
router.get('/:url', enlacesController.obtenerEnlace)
module.exports =router;