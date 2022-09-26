import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getEstadoEquipo } from "../../services/estadoEquipoService";
import { ListaNew } from "../ListNew";
import { ListTable } from "../ListTable";

export const EstadoView = () => {
  const [estadoEquipos, setEstadoEquipos] = useState([]);

  const listarEstadoEquipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getEstadoEquipo();
      setEstadoEquipos(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarEstadoEquipos();
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
              <ListaNew list={listarEstadoEquipos} />
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
                  {estadoEquipos.map((estadoEquipo, index) => {
                    return (
                      <tbody key={estadoEquipo._id}>
                        <ListTable
                          to={`/estados/edit/${estadoEquipo._id}`}
                          {...{ ...estadoEquipo }}
                          i={index}
                        />
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
