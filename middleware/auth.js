const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
module.exports = (req,res, next) => {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      try {
        const usuario = jwt.verify(token, process.env.SECRETA);
        console.log(usuario);
        req.usuario=usuario;
      } catch (error) {
        console.error(error);
        console.log("jwt no valido");
      }
      //comprobar el JWT
    }
    return next();
    return next()
}