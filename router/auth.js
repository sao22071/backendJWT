const UsuarioSys = require("../models/Usuario");
const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/registrar", async function (req, res) {
  const { email, password } = req.body;

  try {
    console.log(req.body);

    const usuarioSysBD = await UsuarioSys.findOne({ email });

    if (usuarioSysBD) {
      return res.status(400).json({
        msg: "Ya existe usuario",
      });
    }
    const usuarioSys = new UsuarioSys(req.body);

    // cifrar la contraseña antes de guardarla
    const salt = await bcryptjs.genSalt();
    const passwordEnc = bcryptjs.hashSync(password, salt);
    usuarioSys.password = passwordEnc;

    const usuarioSysSaved = await usuarioSys.save();
    return res.status(201).json(usuarioSysSaved);
  } catch (error) {
    console.log(error);
    res.send("ocurrió un error" + error);
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  try {
    console.log(req.body);

    const usuarioSys = await UsuarioSys.findOne({ email });

    //verificar si usuario no existe
    if (!usuarioSys) {
      return res.status(404).json({
        msg: "No existe usuario",
      });
    }

    //Si el estado del usuario es false
    if (!usuarioSys.estado) {
      return res.status(401).json({
        msg: "Usuario inactivo",
      });
    }

    //comparación de contraseñas
    const esPassword = bcryptjs.compareSync(password, usuarioSys.password);
    if (!esPassword) {
      return res.status(401).json({
        msg: "Credenciales incorrectas",
      });
    }

    const payload = {
      usuario: usuarioSys.email,
      nombre: usuarioSys.nombre,
      rol: usuarioSys.rol,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ usuarioSys, token });
  } catch (error) {
    return res.status(500).json({ msj: error });
  }
});
module.exports = router;
