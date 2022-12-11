import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  actualizarEstadoEquipo,
  getEstadoEquipoPorId,
} from "../../services/estadoEquipoService";

export const EstadoUpdate = () => {
  const { estadoEquipoId = "" } = useParams();
  let hisotryObj = useHistory();
  const [estadoEquipo, setEstadoEquipo] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "", estado = "" } = valoresForm;

  const getEstadoEquipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getEstadoEquipoPorId(estadoEquipoId);
      setEstadoEquipo(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    getEstadoEquipos();
  }, [estadoEquipoId]);

  useEffect(() => {
    setValoresForm({
      nombre: estadoEquipo.nombre,
      estado: estadoEquipo.estado,
    });
  }, [estadoEquipo]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const limpiarValores = () => {
    setValoresForm({ nombre: "", estado: "" });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const estadoEquipos = {
      nombre,
      estado,
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarEstadoEquipo(
        estadoEquipoId,
        estadoEquipos
      );
      limpiarValores();
      Swal.close();
      hisotryObj.push("/estados");
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
          <h5 className="card-title">Detalle Estado Equipo</h5>
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
