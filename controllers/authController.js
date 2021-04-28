const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");
exports.autenticarUsuario = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //revisar si hay errores
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  //buscar el usuario para ver si esta registradoasdsd
  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    //next();
  }
  //verificar el password y autenticar el usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    console.info("El passowrd es correcto");
    //crear JWT
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      process.env.SECRETA,
      { expiresIn: "8h" }
    );
    console.info(token);
    res.status(201).json({ token });
  } else {
    res.status(401).json({ msg: "Password Incorrecto" });
    console.log("Password incorrecto");
  }
};
exports.usuarioAutenticado = (req, res, next) => {
    res.json(req.usuario)
};
