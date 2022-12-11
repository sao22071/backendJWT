const { Router } = require("express");
const router = Router();

const Usuario = require("../models/Usuario");

router.post("/", async function (req, res) {
  try {
    console.log(req.body);

    const existeUsuario = await Usuario.findOne({ email: req.body.email });

    if (existeUsuario) {
      return res.status(400).send("Ya existe email ");
    }

    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error" + error);
  }
});

router.get("/", async function (req, res) {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error");
  }
});

router.put("/:usuarioId", async function (req, res) {
  try {
    console.log("objeto recibido", req.body, req.params);

    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.send("Usuario no existe");
    }

    const existeUsuario = await Usuario.findOne({
      email: req.body.email,
      _id: { $ne: usuario._id },
    });

    if (existeUsuario) {
      return res.send("Email ya existe");
    }

    // let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error" + error);
  }
});

router.get("/:usuarioId", async function (req, res) {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    res.send(usuario);
    if (!usuario) {
      return res.status(404).send("usuario no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ocurrió un error");
  }
});

module.exports = router;
