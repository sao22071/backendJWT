const { Router } = require("express");
const Marca = require("../models/Marca");
const router = Router();

router.post("/", async function (req, res) {
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

router.get("/", async function (req, res) {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});
router.put("/:marcaId", async function (req, res) {
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

router.get("/:marcaId", async function (req, res) {
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

module.exports = router;
