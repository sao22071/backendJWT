import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getTipoEquipo } from "../../services/tipoEquipoService";
import { TipoLista } from "./TipoLista";
import { TipoNew } from "./TipoNew";

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTipoEquipo();
      setTipos(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarTipos();
  }, []);

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Tipos de Equipo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <TipoNew listarTipos={listarTipos} />
              <div className="row mt-4">
                <table className="table table-hover table-styles-users">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Status</th>
                      <th scope="col">Fecha Creación</th>
                      <th scope="col">Fecha Actualizacion</th>
                    </tr>
                  </thead>
                  {tipos.map((tipos, index) => {
                    return (
                      <tbody key={tipos._id}>
                        <TipoLista tipos={tipos} i={index} />
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
