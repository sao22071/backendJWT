import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { crearUsuarios } from "../../services/usuarioService";

export const UsuarioNew = ({ listarUsuarios }) => {
  const [valoresForm, setValoresForm] = useState({});

  const { nombre = "", email = "", estado = "" } = valoresForm;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const limpiarValores = () => {
    setValoresForm({ nombre: "", estado: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usuarios = {
      nombre,
      email,
      estado,
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await crearUsuarios(usuarios);
      Swal.close();
      listarUsuarios();
      limpiarValores();
    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if (error || error.response || error.response.data) {
        mensaje = error.response.data;
      } else {
        mensaje = "Ocurrio un error, por favor verifique los datos";
      }
      Swal.fire("Error", mensaje, "error");
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              required
              type="text"
              name="nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              required
              className="form-select"
              onChange={(e) => handleOnChange(e)}
              name="estado"
              value={estado}
            >
              <option value="">--SELECCIONE--</option>;<option>Activo</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1">
          <button className="btn btn-primary">Guardar</button>
        </div>
        <div className="col-md-1">
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </form>
  );
};
