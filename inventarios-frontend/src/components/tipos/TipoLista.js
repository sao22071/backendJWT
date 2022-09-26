import React from "react";
import { Link } from "react-router-dom";

export const TipoLista = ({ tipos, i }) => {
  const { estado, fechaActualizacion, fechaCreacion, nombre } = tipos;

  const funcionFecha = (fechaTimeStamp) => {
    return new Date(fechaTimeStamp).toLocaleDateString("es-CO");
  };

  const funcionHora = (horafechaTimeStamp) => {
    return new Date(horafechaTimeStamp).toLocaleTimeString("es-CO");
  };

  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{nombre}</td>
      <td>{estado}</td>
      <td>{`${funcionFecha(new Date(fechaCreacion))} - ${funcionHora(
        new Date(fechaCreacion)
      )}`}</td>
      <td>{`${funcionFecha(new Date(fechaActualizacion))} - ${funcionHora(
        new Date(fechaActualizacion)
      )}`}</td>
      <td>
        <Link to={`/tipos/edit/${tipos._id}`}>
          <button className="btn btn-success">editar</button>
        </Link>
      </td>
    </tr>
  );
};
