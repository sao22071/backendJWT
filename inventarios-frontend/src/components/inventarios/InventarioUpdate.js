import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getEstadoEquipo } from "../../services/estadoEquipoService";
import {
  editInventarios,
  getInventarioPorId,
} from "../../services/inventarioService";
import { getMarcas } from "../../services/marcaService";
import { getTipoEquipo } from "../../services/tipoEquipoService";
import { getUsuarios } from "../../services/usuarioService";

export const InventarioUpdate = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const { inventarioId = "" } = useParams();
  const [inventario, setInventario] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const {
    serial = "",
    modelo = "",
    descripcion = "",
    color = "",
    foto = "",
    fechaCompra = "",
    precio = "",
    usuario,
    marca,
    tipoEquipo,
    estadoEquipo,
  } = valoresForm;

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarTipoEquipos = async () => {
    try {
      const { data } = await getTipoEquipo();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarEstadoEquipo = async () => {
    try {
      const { data } = await getEstadoEquipo();
      setEstados(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarUsuarios();
    listarMarcas();
    listarTipoEquipos();
    listarEstadoEquipo();
  }, []);

  const getInventario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getInventarioPorId(inventarioId);
      setInventario(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    getInventario();
  }, [inventarioId]);

  useEffect(() => {
    setValoresForm({
      serial: inventario.serial,
      modelo: inventario.modelo,
      descripcion: inventario.descripcion,
      color: inventario.color,
      foto: inventario.foto,
      fechaCompra: inventario.fechaCompra,
      precio: inventario.precio,
      usuario: inventario.usuario,
      marca: inventario.marca,
      tipoEquipo: inventario.tipoEquipo,
      estadoEquipo: inventario.estadoEquipo,
    });
  }, [inventario]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventarios = {
      serial,
      modelo,
      descripcion,
      color,
      foto,
      precio,
      fechaCompra,
      usuario: { _id: usuario },
      marca: { _id: marca },
      tipoEquipo: { _id: tipoEquipo },
      estadoEquipo: { _id: estadoEquipo },
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await editInventarios(inventarioId, inventarios);
      console.log(data);
      Swal.close();
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
          <h5 className="card-title">Detalle Activo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img src={inventario?.foto} alt={inventario?.descripcion} />
            </div>
            <div className="col-md-8">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input
                        required
                        minLength={3}
                        type="text"
                        name="serial"
                        className="form-control"
                        value={serial}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Modelo</label>
                      <input
                        required
                        type="text"
                        name="modelo"
                        className="form-control"
                        value={modelo}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <input
                        required
                        type="text"
                        name="descripcion"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Color</label>
                      <input
                        required
                        type="text"
                        name="color"
                        className="form-control"
                        value={color}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Foto</label>
                      <input
                        required
                        type="url"
                        name="foto"
                        className="form-control"
                        value={foto}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Fecha Compra</label>
                      <input
                        required
                        type="date"
                        name="fechaCompra"
                        className="form-control"
                        value={fechaCompra}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        required
                        type="number"
                        name="precio"
                        className="form-control"
                        value={precio}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Usuario</label>
                      <select
                        required
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="usuario"
                        value={usuario}
                      >
                        <option value="">--SELECCIONE--</option>;
                        {usuarios.map(({ _id, nombre }) => {
                          return (
                            <option value={_id} key={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <select
                        required
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="marca"
                        value={marca}
                      >
                        <option value="">--SELECCIONE--</option>;
                        {marcas.map(({ _id, nombre }) => {
                          return (
                            <option value={_id} key={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Tipo Equipo</label>
                      <select
                        required
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="tipoEquipo"
                        value={tipoEquipo}
                      >
                        <option value="">--SELECCIONE--</option>;
                        {tipos.map(({ _id, nombre }) => {
                          return (
                            <option value={_id} key={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Estado Equipo</label>
                      <select
                        required
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="estadoEquipo"
                        value={estadoEquipo}
                      >
                        <option value="">--SELECCIONE--</option>;
                        {estados.map(({ _id, nombre }) => {
                          return (
                            <option value={_id} key={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary">Guardar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
