const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Agregar evento al botón de búsqueda
btnBuscar.addEventListener('click', () => {
  const query = inputBuscar.value.trim(); // Obtener el valor del input

  if (query) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
      .then(response => response.json()) 
      .then(data => {
        const resultados = data.collection.items; 
        contenedor.innerHTML = '';

        if (resultados.length > 0) {
            resultados.forEach(item => {
            const { title, description, date_created } = item.data[0];
            const imageUrl = item.links && item.links[0].href ? item.links[0].href : 'https://via.placeholder.com/300';

            // Crear tarjeta con Bootstrap
            const tarjeta = `
              <div class="col-md-4 mb-4">
                <div class="card">
                  <img src="${imageUrl}" class="card-img-top" alt="${title}">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description ? description.slice(0, 100) + '...' : 'No description available'}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                  </div>
                </div>
              </div>
            `;

            // Agregar la tarjeta al contenedor
            contenedor.innerHTML += tarjeta;
          });
        } else {
           contenedor.innerHTML = '<p class="text-warning">No se encontraron resultados.</p>';
        }
      })
      .catch(error => {
        console.error('Error al buscar imágenes:', error);
        contenedor.innerHTML = '<p class="text-danger">Ocurrió un error al realizar la búsqueda.</p>';
      });
  } else {
     contenedor.innerHTML = '<p class="text-warning">Por favor, ingrese un término de búsqueda.</p>';
  }
});