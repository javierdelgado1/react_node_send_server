const express = require("express");
const archivosController = require("../controllers/archivosController");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");



router.post("/", auth, archivosController.subirArchivo);

router.delete("/:id", archivosController.eliminarArchivo);

module.exports = router;
