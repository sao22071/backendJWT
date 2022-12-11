const { Router } = require("express");
const validarJwt = require("../middlewares/validarJWT");
const { esAdmin } = require("../middlewares/validarRol");
const Marca = require("../models/Marca");
const router = Router();

router.post("/", validarJwt, esAdmin, async function (req, res) {
  try {
    let marca = new Marca();

    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

    res.send(marca);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/", validarJwt, async function (req, res) {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});
router.put("/:marcaId", validarJwt, async function (req, res) {
  try {
    let marca = await Marca.findById(req.params.marcaId);

    if (!marca) {
      return res.send("la marca no existe");
    }

    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

    res.send(marca);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.get("/:marcaId", validarJwt, async function (req, res) {
  try {
    const marca = await Marca.findById(req.params.marcaId);
    res.send(marca);
    if (!marca) {
      return res.status(404).send("Marca no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ocurrió un error");
  }
});

router.delete("/:marcaId", validarJwt, async function (req, res) {
  try {
    const id = req.params.marcaId;
    const marca = await Marca.findById(id);
    if (!marca) {
      return res.status(404).send("Marca no existe");
    }
    await Marca.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({ msj: error });
  }
});
module.exports = router;
