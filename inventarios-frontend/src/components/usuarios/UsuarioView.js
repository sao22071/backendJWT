import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getUsuarios } from "../../services/usuarioService";
import { UsuarioNew } from "./UsuarioNew";
import { UsuarioLista } from "./UsuarioLista";

export const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState([]);

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getUsuarios();
      setUsuarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Usuarios</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <UsuarioNew listarUsuarios={listarUsuarios} />
              <div className="row mt-4">
                <table className="table table-hover table-styles-users">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Fecha Creación</th>
                      <th scope="col">Fecha Actualizacion</th>
                    </tr>
                  </thead>
                  {usuarios.map((usuario, index) => {
                    return (
                      <tbody key={usuario._id}>
                        <UsuarioLista usuario={usuario} i={index} />
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
