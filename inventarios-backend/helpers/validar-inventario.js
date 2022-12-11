const validarInventario = (req) => {
  const validaciones = [];

  if (!req.body.serial) {
    validaciones.push("Serial es requirido");
  }

  if (!req.body.modelo) {
    validaciones.push("modelo es requirido");
  }
  if (!req.body.descripcion) {
    validaciones.push("descripcion es requirido");
  }
  if (!req.body.foto) {
    validaciones.push("foto es requirido");
  }
  if (!req.body.fechaCompra) {
    validaciones.push("fechacompra es requerido");
  }
  if (!req.body.color) {
    validaciones.push("color es requirido");
  }
  if (!req.body.precio) {
    validaciones.push("precio es requirido");
  }
  if (!req.body.usuario) {
    validaciones.push("usuario es requirido");
  }
  if (!req.body.marca) {
    validaciones.push("marca es requirido");
  }
  if (!req.body.tipoEquipo) {
    validaciones.push("tipoEquipo es requirido");
  }
  if (!req.body.estadoEquipo) {
    validaciones.push("estadoEquipo es requirido");
  }

  return validaciones;
};

module.exports = {
  validarInventario,
};
