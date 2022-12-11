const { Router } = require("express");
const validarJwt = require("../middlewares/validarJWT");
const { esAdmin } = require("../middlewares/validarRol");
const EstadoEquipo = require("../models/EstadoEquipo");
const router = Router();

router.post("/", validarJwt, esAdmin, async function (req, res) {
  try {
    let estadoEquipo = new EstadoEquipo();

    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = new Date();

    estadoEquipo = await estadoEquipo.save();

    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/", validarJwt, async function (req, res) {
  try {
    const estados = await EstadoEquipo.find();
    res.send(estados);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});
router.put("/:estadoEquipoId", validarJwt, async function (req, res) {
  try {
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

    if (!estadoEquipo) {
      return res.send("el estado no existe");
    }

    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaActualizacion = new Date();

    estadoEquipo = await estadoEquipo.save();

    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/:estadoEquipoId", validarJwt, async function (req, res) {
  try {
    const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
    res.send(estadoEquipo);
    if (!estadoEquipo) {
      return res.status(404).send("EstadoEquipo no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ocurrió un error");
  }
});

module.exports = router;
