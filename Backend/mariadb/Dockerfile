# Usamos la imagen oficial de MariaDB
FROM mariadb:latest

# Definir la variable de entorno para la contraseña de root de MariaDB
# ENV MARIADB_ROOT_PASSWORD=1234
# Ya no hace falta la línea anterior porque la contraseña se pasa como argumento en el archivo variables.env

# Copiame el fichero .sql (que crea la base de datos con la tabla de prueba) dentro del contenedor
# Si lo ponemos en esye directorio, ejecutará el script
# la primera vez que se arranque el contenedor a partir de esta imagen
COPY ./sql/*.sql /docker-entrypoint-initdb.d/
