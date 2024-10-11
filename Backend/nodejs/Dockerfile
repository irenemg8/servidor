# Usamos la imagen oficial de Node.js
FROM node:18

#Directorio de trabajo
WORKDIR /home/nodejs

# Copiamos el package.json y package-lock.json
COPY package*.json ./
COPY main.js /home/nodejs
# COPY servidorRest.js /home/nodejs
RUN if [ ! -f package.json ]; then npm init -y; fi

# Instalamos las dependencias
RUN apt update
RUN npm install mariadb
RUN npm install cors

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para ejecutar tu aplicación
# RUN es para ejecutar la imagen una vez para la instalación. COMANDO DE INSTALACIÓN DE LA IMAGEN
# CMD es para ejecutar la imagen cada vez que se inicie un contenedor. COMANDO DE EJECUCIÓN DE LA IMAGEN
CMD ["node", "main.js"]
