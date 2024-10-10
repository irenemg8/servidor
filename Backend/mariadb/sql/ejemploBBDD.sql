CREATE DATABASE IF NOT EXISTS ejemploBBDD;

USE ejemploBBDD;

CREATE TABLE IF NOT EXISTS mediciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora TIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    id_sensor INT NOT NULL,
    valorGas DECIMAL(5,2) NOT NULL,
    valorTemperatura DECIMAL(5,2) NOT NULL
);

-- Datos de ejemplo
INSERT INTO mediciones (hora, lugar, id_sensor, valorGas, valorTemperatura) VALUES
('10:00', 'Madrid', 101, 40.00, 35.00),
('11:00', 'Barcelona', 102, 30.00, 32.00),
('12:00', 'Sevilla', 103, 20.00, 38.00),
('13:00', 'Valencia', 104, 10.00, 36.00)