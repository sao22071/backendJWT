export const funcionFecha = (fechaTimeStamp) => {
  return new Date(new Date(fechaTimeStamp)).toLocaleDateString("es-CO");
};

export const funcionHora = (horafechaTimeStamp) => {
  return new Date(new Date(horafechaTimeStamp)).toLocaleTimeString("es-CO");
};
