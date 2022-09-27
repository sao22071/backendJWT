#Instalar node en la aplicacion
FROM node:16

# Crear la ruta para crear el contenedor y copiar todo el 
# codigo de la imagen  
WORKDIR /usr/src/app

# Contiene todas las dependencias que la app necesita para funcionar 
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo en el directorio creado APP
COPY . .

# Para consumir los servicios del contenedor se debe escuchar el puerto 8080 
EXPOSE 4000
# se cambia a index.js ya que en ese archivo es donde se ve el inicio de la aplicacion
CMD [ "node", "index.js" ]