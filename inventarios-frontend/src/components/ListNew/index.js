import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { crearEstadoEquipo } from "../../services/estadoEquipoService";

export const ListaNew = ({ list }) => {
  const [valoresForm, setValoresForm] = useState({});

  const { nombre = "", estado = "" } = valoresForm;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const limpiarValores = () => {
    setValoresForm({ nombre: "", estado: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const estadoValores = {
      nombre,
      estado,
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await crearEstadoEquipo(estadoValores);
      Swal.close();
      list();
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
    list();
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
            <label className="form-label">Estado</label>
            <select
              required
              className="form-select"
              onChange={(e) => handleOnChange(e)}
              name="estado"
              value={estado}
            >
              <option value="">--SELECCIONE--</option>;<option>Activo</option>
              <option>Inactivo</option>
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
