const { Router } = require("express");
const validarJwt = require("../middlewares/validarJWT");
const { esAdmin } = require("../middlewares/validarRol");
const TipoEquipo = require("../models/TipoEquipo");
const router = Router();

router.post("/", validarJwt, esAdmin, async function (req, res) {
  try {
    let tipoEquipo = new TipoEquipo();

    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaCreacion = new Date();
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();

    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/", validarJwt, async function (req, res) {
  try {
    const tipoEquipo = await TipoEquipo.find();
    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.put("/:tipoEquipoId", validarJwt, async function (req, res) {
  try {
    let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

    if (!tipoEquipo) {
      return res.send("el tipo de equipo no existe");
    }

    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();

    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/:tipoEquipoId", validarJwt, async function (req, res) {
  try {
    const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
    res.send(tipoEquipo);
    if (!tipoEquipo) {
      return res.status(404).send("Tipo no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ocurrió un error");
  }
});

module.exports = router;
