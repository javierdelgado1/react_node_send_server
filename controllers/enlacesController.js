const Enlaces = require('../models/Enlaces');
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator");
exports.nuevoEnlace = async(req, res, next) =>{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    
    console.log("desde nuevo enlace")
    console.log(req.body)
    // crear un objecto de enlace
    const {nombre_original, password} = req.body;

    const enlace = new Enlaces ();
    enlace.url= shortid.generate();
    enlace.nombre= shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password = password;
    
    if(req.usuario){
        const {password, descargas} = req.body;
        if(descargas){
            enlace.descargas= descargas;
        }
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password=await bcrypt.hash(password, salt);
        }

        enlace.autor = req.usuario.id;
    }
    // almacenar en la BD
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`});
        next();
    } catch (error) {
        console.log(error)
    }
}

exports.obtenerEnlace = async (req, res)=>{
    console.log(req.params.url)
    const {url} = req.params
    //verificar si existe el enlacesController
    const enlace = await Enlaces.findOne({url: url})

    if(!enlace){
        res.status(404).json({msg: "Ese enlace no existe"})
    }
    res.json({archivo:enlace.nombre})
    console.log(enlace)

}