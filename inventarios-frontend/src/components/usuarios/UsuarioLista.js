import React from "react";
import { Link } from "react-router-dom";

export const UsuarioLista = ({ usuario, i }) => {
  const { email, estado, fechaActualizacion, fechaCreacion, nombre } = usuario;

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
      <td>{email}</td>
      <td>{estado}</td>
      <td>{`${funcionFecha(new Date(usuario.fechaCreacion))} - ${funcionHora(
        new Date(usuario.fechaCreacion)
      )}`}</td>
      <td>{`${funcionFecha(
        new Date(usuario.fechaActualizacion)
      )} - ${funcionHora(new Date(usuario.fechaActualizacion))}`}</td>
      <td>
        <Link to={`/usuarios/edit/${usuario._id}`}>
          <button className="btn btn-success">editar</button>
        </Link>
      </td>
    </tr>
  );
};
