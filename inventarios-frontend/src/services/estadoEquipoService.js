import { axiosInstance } from "../helpers/axios-config";

const getEstadoEquipo = () => {
  return axiosInstance.get("estado-equipo", {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const crearEstadoEquipo = (data) => {
  return axiosInstance.post("estado-equipo", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const actualizarEstadoEquipo = (estadoEquipoId, data) => {
  return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getEstadoEquipoPorId = (estadoEquipoId) => {
  return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export {
  getEstadoEquipo,
  crearEstadoEquipo,
  actualizarEstadoEquipo,
  getEstadoEquipoPorId,
};
