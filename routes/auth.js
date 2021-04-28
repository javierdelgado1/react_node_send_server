const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { check } = require("express-validator");
const auth= require('../middleware/auth')
router.post("/",
[
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password no puede ir vacion').not().isEmpty()
], authController.autenticarUsuario);


router.get("/",auth, authController.usuarioAutenticado);

module.exports = router;
