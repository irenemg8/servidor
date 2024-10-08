# Sprint0

## MariaDB 
### SQL
El archivo `ejemploBBDD.sql`, dentro de la carpeta mariadb, contiene la base de datos. 
Aquí se guarda la información que se recibe de los sensores, o en nuestro primer sprint, del dato introducido manualmente en Arduino. 

Elementos de ejemploBBDD.sql:
- `id`: Es la Primary Key y es un valor que se autoincrementa.
- `hora`: Está definida por el tipo de variable `TIME` y debe ser `NOT NULL`. No tiene sentido que una hora sea 0, por lo que le damos la estructura "00:00", siendo el primer par de ceros las horas (de 1 a 24) y el segundo par los minutos.
- `lugar`: Definido por el tipo de variable `VARCHAR` que puede contener hasta 255 caracteres, tampoco puede ser `NULL`, necesitamos geoposicionar el sensor en algún sitio.
- `id_sensor`: Es un valor entero `INT` y será el encargado de identificar a cada sensor.
- `valorGas`: Es la medición que dará el sensor de gas y está definida por un número `DECIMAL(5,2)`, que tampoco puede ser `NULL`. De momento pasará el valor introducido en Arduino.
- `valorTemperatura`: Es la medición que dará el sensor de temperatura. Sigue estando definida por un número `DECIMAL(5,2)` y su implementación se realizará en un futuro. De momento no lo tocamos.

Un ejemplo de inserción de datos podría ser el siguiente:
```sql
INSERT INTO mediciones (id, hora, lugar, idSensor, valorGas, valorTemperatura) 
VALUES (123, '11:30', 'Yecla', 234, 33, 20);
```
Para consultar estos datos podemos acceder a: [http://localhost:8080](http://localhost:8080)


## NodeJS
Dentro de la carpeta de Node.js están los módulos que se crean al iniciar por primera vez npm con Node.js.
Para inicializarlos usamos: `npm init -y`

El Dockerfile de Node.js funciona de la siguiente manera:
- **Imagen Base**: Se utiliza la última imagen de Node.js de la web oficial de Docker Hub ([node](https://hub.docker.com/_/node)). Para crear esta imagen se ejecuta el comando `docker pull node`.
- **Directorio de Trabajo**: Se crea el directorio donde se ejecutará nuestra lógica de negocio ubicada en el archivo `main.js`.
- **Copiar Archivos de Dependencias**: Se copian los archivos generados por el comando `npm init -y` (`package.json` y `package-lock.json`) desde nuestro host al sistema de archivos del contenedor Docker.
- **Instalación de Dependencias**: Para comunicarse con la base de datos de MariaDB, es necesario que se ejecute la instalación con el comando `npm install mariadb`.
- **Copiar Código**: Con `COPY . .` copiamos el resto del código de nuestra máquina host al contenedor Docker en el directorio correspondiente.
- **Exponer Puerto**: Abrimos el puerto 8080 de nuestra máquina local con el comando `EXPOSE 8080`. De esta manera podremos acceder al JSON de la base de datos con la siguiente URL: [http://localhost:8080](http://localhost:8080).
- **Ejecutar Aplicación**: Por último, ejecutamos en la consola nuestro `main.js` con el comando `CMD ["node", "main.js"]`.

#### ServidorREST
En el archivo `servidorREST.js` se ha creado un pequeño servidor REST donde se ha configurado la base de datos de MariaDB, pasándole los parámetros para poder acceder a la misma. También, se ha implementado una API con Swagger, que es una herramienta gráfica que ayuda a probar la API creada. Esta API se encarga de hacer consultas a la base de datos de manera de prueba. Puede realizar tanto GET como POST, apuntando a la tabla de mediciones (que contiene los campos: `id`, `hora`, `lugar`, `idSensor`, `valorGas`, `valorTemperatura`).

El funcionamiento de la API se puede ver de manera muy visual yendo a la siguiente dirección URL: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).

### docker-compose.yml
Este es un archivo que se encarga de unir tanto el Dockerfile de MariaDB como el Dockerfile de Node.js. Con este archivo, se ejecutan automáticamente ambos sin la necesidad de teclear nada por la terminal.

- **MariaDB**: Se abre un puerto en 3306 y un puerto de Docker (también el 3306). Después, crea una red interna que es esencial para que ambos contenedores funcionen correctamente sincronizados. En mi caso se llama "redsprint0". He implementado también una verificación de salud del contenedor de MariaDB. El comando `healthcheck` se encarga de pasar unos tests internos que aseguran el correcto funcionamiento del contenedor.
- **Node.js**: En el módulo de Node.js se abre también un puerto (en este caso el 8080 para que no se solape con el 3306 de MariaDB) y se crea también la misma red que hará de puente entre los dos contenedores.
