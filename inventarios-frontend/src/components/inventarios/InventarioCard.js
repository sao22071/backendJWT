import React from "react";
import { Link } from "react-router-dom";

export const InventarioCard = ({ inventario }) => {
  return (
    <div className="col">
      <div className="card">
        <img src={inventario.foto} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Caracteristicas</h5>
          <hr />
          <p className="card-text">Serial: {inventario.serial}</p>
          <p className="card-text">Descripción: {inventario.descripcion}</p>
          <p className="card-text">Modelo: {inventario.modelo}</p>
          <p className="card-text">Precio: ${inventario.precio}</p>
          <p className="card-text">
            <Link to={`/inventarios/edit/${inventario._id}`}>Ver Más...</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
