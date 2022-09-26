import { axiosInstance } from "../helpers/axios-config";

const getTipoEquipo = () => {
  return axiosInstance.get("tipo-equipo", {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const crearTipoEquipo = (data) => {
  return axiosInstance.post("tipo-equipo", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const actualizarTipoEquipo = (tipoEquipoId, data) => {
  return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getTipoPorId = (tipoEquipoId) => {
  return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export { getTipoEquipo, crearTipoEquipo, actualizarTipoEquipo, getTipoPorId };
