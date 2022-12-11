import React from "react";
import { Link } from "react-router-dom";
import { funcionFecha, funcionHora } from "../../helpers/dateTime";

export const ListTable = ({
  to,
  estado,
  fechaActualizacion,
  fechaCreacion,
  nombre,
  i,
}) => {
  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{nombre}</td>
      <td>{estado}</td>
      <td>{`${funcionFecha(fechaCreacion)} - ${funcionHora(
        fechaCreacion
      )}`}</td>
      <td>{`${funcionFecha(fechaActualizacion)} - ${funcionHora(
        fechaActualizacion
      )}`}</td>
      <td>
        <Link to={to}>
          <button className="btn btn-success">editar</button>
        </Link>
      </td>
    </tr>
  );
};
