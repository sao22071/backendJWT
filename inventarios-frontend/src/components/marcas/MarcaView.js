import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { crearMarcas, getMarcas } from "../../services/marcaService";
import { ListaNew } from "../ListNew";
import { ListTable } from "../ListTable";

export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);

  const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getMarcas();
      setMarcas(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarMarcas();
  }, []);

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Marcas</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <ListaNew list={() => listarMarcas} onSubmit={crearMarcas} />
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
                  {marcas.map((marca, index) => {
                    return (
                      <tbody key={marca._id}>
                        <ListTable
                          to={`/marcas/edit/${marca._id}`}
                          {...{ ...marca }}
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
