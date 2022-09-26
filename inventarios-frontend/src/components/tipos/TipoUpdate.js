import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import {
  actualizarTipoEquipo,
  getTipoPorId,
} from "../../services/tipoEquipoService";

export const TipoUpdate = () => {
  const { tipoEquipoId = "" } = useParams();
  let hisotryObj = useHistory();
  const [tipo, setTipo] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "", estado = "" } = valoresForm;

  const getTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTipoPorId(tipoEquipoId);
      setTipo(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    getTipos();
  }, [tipoEquipoId]);

  useEffect(() => {
    setValoresForm({
      nombre: tipo.nombre,
      estado: tipo.estado,
    });
  }, [tipo]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };
  const limpiarValores = () => {
    setValoresForm({ nombre: "", estado: "" });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const tipos = {
      nombre,
      estado,
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarTipoEquipo(tipoEquipoId, tipos);
      limpiarValores();
      Swal.close();
      hisotryObj.push("/tipos");
    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if (error && error.response && error.response.data) {
        mensaje = error.response.data;
      } else {
        mensaje = "Ocurrio un error, por favor verifique los datos";
      }
      Swal.fire("Error", mensaje, "error");
    }
  };

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Detalle Tipo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
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
                      <option value="">--SELECCIONE--</option>;
                      <option>Activo</option>
                      <option>Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <button className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
