const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.nuevoUsuario = async (req, res) => {
  //
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //Vericar si el usuario ya ha sido registrado
  const { email, password } = req.body;
  let exitsUsuario = await Usuario.findOne({ email });
  if (exitsUsuario) {
    return res.status(400).json({ msg: "El Usuario ya esta registrado" });
  }
  //crear nuevo usuario

  try {
    const usuario = await new Usuario(req.body);
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.save();
  } catch (error) {
    console.error(error);
  }

  res.json({ msg: "Usuario creado correctamente" });
};
