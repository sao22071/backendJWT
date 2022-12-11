import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import {
  actualizarUsuarios,
  getUsuarioPorId,
} from "../../services/usuarioService";

export const UsuarioUpdate = () => {
  const { usuarioId = "" } = useParams();
  let hisotryObj = useHistory();
  const [usuario, setUsuario] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "", email = "", estado = "" } = valoresForm;

  const getUsuario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getUsuarioPorId(usuarioId);
      setUsuario(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    getUsuario();
  }, [usuarioId]);

  useEffect(() => {
    setValoresForm({
      nombre: usuario.nombre,
      email: usuario.email,
      estado: usuario.estado,
    });
  }, [usuario]);

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
      const { data } = await actualizarUsuarios(usuarioId, usuarios);
      limpiarValores();
      Swal.close();
      hisotryObj.push("/usuarios");
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
          <h5 className="card-title">Detalle Usuario</h5>
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
