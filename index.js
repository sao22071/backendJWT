const express = require("express");
const { getConnection } = require("./bd/db-connect-mongo");
const cors = require("cors");
//CONFIGURANDO VARIABLE DE ENTORNO PARA DOCKER
require("dotenv").config();

const app = express();
const port = process.env.PORT;

//implementación CORS
app.use(cors());

getConnection();

//Parse JSON
app.use(express.json());

app.use("/usuario", require("./router/usuario"));
app.use("/estado-equipo", require("./router/estadoEquipo"));
app.use("/marca", require("./router/marca"));
app.use("/tipo-equipo", require("./router/tipoEquipo"));
app.use("/inventario", require("./router/inventario"));

//MODULO AUTENTICACIÓN Y AUTORIZACION
app.use("/auth", require("./router/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
