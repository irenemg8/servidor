async function obtenerMediciones() {
    try {
        const response = await fetch('http://192.168.0.26:8080/mediciones');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        mostrarMediciones(data);
    } catch (error) {
        console.error('Error al obtener las mediciones:', error);
    }
}

function mostrarMediciones(mediciones) {
    const contenedor = document.getElementById('mediciones');
    contenedor.innerHTML = '';

    mediciones.forEach(medicion => {
        const div = document.createElement('div');
        div.className = 'medicion';
        div.innerHTML = `
            <p><strong>ID:</strong> ${medicion.id}</p>
            <p><strong>Hora:</strong> ${medicion.hora}</p>
            <p><strong>Lugar:</strong> ${medicion.lugar}</p>
            <p><strong>ID Sensor:</strong> ${medicion.id_sensor}</p>
            <p><strong>Valor Gas:</strong> ${medicion.valorGas}</p>
            <p><strong>Valor Temperatura:</strong> ${medicion.valorTemperatura}</p>
        `;
        contenedor.appendChild(div);
    });
    
}

// Llamar a la función para obtener las mediciones al cargar la página
window.onload = obtenerMediciones;
