import { axiosInstance } from "../helpers/axios-config";

const getInventarios = () => {
  return axiosInstance.get("inventario", {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const crearInventarios = (data) => {
  return axiosInstance.post("inventario", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const editInventarios = (inventarioId, data) => {
  return axiosInstance.put(`inventario/${inventarioId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getInventarioPorId = (inventarioId) => {
  return axiosInstance.get(`inventario/${inventarioId}`, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
export {
  getInventarios,
  crearInventarios,
  editInventarios,
  getInventarioPorId,
};
