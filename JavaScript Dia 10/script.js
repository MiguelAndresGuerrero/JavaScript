// Función principal para buscar un personaje por ID ingresado
function search_Id() {
    let search = document.getElementById("enterId").value.trim(); // Obtener y limpiar el valor del ID ingresado
    if (search === "") { // Validar si el campo está vacío
        alert("ID inválido :("); // Mostrar alerta si no se ha ingresado un ID
        return;
    }

    let URL = `https://rickandmortyapi.com/api/character/${search}/`; // Construir la URL de la API con el ID ingresado

    fetch(URL) // Hacer una solicitud a la API
        .then(res => res.json()) // Convertir la respuesta a JSON
        .then(data => {
            if (!data.name) { // Verificar si el personaje no fue encontrado
                document.getElementById("view").innerHTML = `<p>Personaje no encontrado</p>`;
                return;
            }

            // Mostrar los detalles del personaje
            let characterHTML = `
                <h2>${data.name} (ID: ${search})</h2>
                <img id="characterImage" class="emerge-from-portal" src="${data.image}" alt="${data.name}">
                <table class="table">
                    <tr><th scope="col">Name:</th><td>${data.name}</td></tr>
                    <tr><th scope="col">Status:</th><td>${data.status}</td></tr>
                    <tr><th scope="col">Species:</th><td>${data.species}</td></tr>
                    <tr><th scope="col">Type:</th><td>${data.type || 'N/A'}</td></tr>
                    <tr><th scope="col">Gender:</th><td>${data.gender}</td></tr>
                    <tr><th scope="col">Origin:</th><td>${data.origin.name}</td></tr>
                </table>
            `;
            document.getElementById("view").innerHTML = characterHTML; // Insertar el HTML de detalles del personaje en la página

            // Inicialmente ocultar los botones de navegación de episodios
            document.getElementById("episode-nav").style.display = "none";

            // Obtener y mostrar episodios asociados con el personaje
            let allEpisodes = [];
            data.episode.forEach(episodeURL => { // Iterar sobre cada URL de episodio
                fetch(episodeURL)
                    .then(res => res.json()) // Convertir la respuesta a JSON
                    .then(episodeData => {
                        allEpisodes.push(episodeData); // Almacenar datos de cada episodio en un array
                        if (allEpisodes.length === data.episode.length) { // Verificar si se han obtenido todos los episodios
                            displayEpisode(allEpisodes, 0); // Mostrar el primer episodio
                        }
                    });
            });
        })
        // Manejo de errores en la solicitud
        .catch(error => {
            document.getElementById("view").innerHTML = `<p>Error al cargar los datos :( ${error}</p>`;
        });
}

// Evento para buscar al presionar la tecla Enter
document.getElementById("enterId").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search_Id(); // Ejecutar la búsqueda
    }
});

// Función para mostrar un episodio específico y manejar la navegación
function displayEpisode(episodes, currentEpisodeIndex) {
    if (currentEpisodeIndex < 0 || currentEpisodeIndex >= episodes.length) return; // Validar el índice del episodio

    let episode = episodes[currentEpisodeIndex]; // Obtener el episodio actual
    let episodeHTML = `
        <div class="episode-item">
            <h4>${episode.name} (${episode.episode})</h4>
            <p>Air Date: ${episode.air_date}</p>
            <ul class="character-list"></ul>
        </div>
    `;
    document.getElementById("episode-content").innerHTML = episodeHTML; // Insertar el HTML del episodio en la página

    // Obtener y mostrar la lista de personajes del episodio
    let episodeCharacterList = [];
    episode.characters.forEach(characterURL => {
        fetch(characterURL)
            .then(res => res.json()) // Convertir la respuesta a JSON
            .then(characterData => {
                episodeCharacterList.push({
                    name: characterData.name,
                    image: characterData.image
                });
                
                if (episodeCharacterList.length === episode.characters.length) { // Verificar si se han obtenido todos los personajes
                    displayCharacterList(episodeCharacterList); // Mostrar la lista de personajes
                }
            });
    });

    // Mostrar los botones de navegación de episodios
    document.getElementById("episode-nav").style.display = "block";

    // Manejar la navegación entre episodios
    document.getElementById("prevEpisode").onclick = () => {
        if (currentEpisodeIndex > 0) {
            displayEpisode(episodes, currentEpisodeIndex - 1); // Mostrar el episodio anterior
        }
    };
    document.getElementById("nextEpisode").onclick = () => {
        if (currentEpisodeIndex < episodes.length - 1) {
            displayEpisode(episodes, currentEpisodeIndex + 1); // Mostrar el siguiente episodio
        }
    };
}

// Función para mostrar la lista de personajes del episodio y manejar la navegación con teclas
function displayCharacterList(characterList) {
    const charactersPerPage = 5; // Número de personajes que se muestran por página
    let currentPage = 0; // Página actual de personajes
    let selectedIndex = 0; // Índice del personaje seleccionado

    // Función para renderizar los personajes en la página actual
    function renderCharacters(page, selectedIdx) {
        let start = page * charactersPerPage;
        let end = start + charactersPerPage;
        let visibleCharacters = characterList.slice(start, end);

        let characterHTML = `<ul>`;
        visibleCharacters.forEach((character, index) => {
            const isSelected = index === selectedIdx ? 'selected' : ''; // Verificar si el personaje está seleccionado
            characterHTML += `
                <li class="character-item ${isSelected}" data-index="${index}">
                    <img src="${character.image}" alt="${character.name}" style="width: 50px; height: 50px;">
                    <p>${character.name}</p>
                </li>`;
        });
        characterHTML += `</ul>`;
        document.querySelector('.character-list').innerHTML = characterHTML; // Insertar la lista de personajes en la página
    }

    renderCharacters(currentPage, selectedIndex); // Renderizar la primera página de personajes

    // Manejar la navegación de personajes con las teclas de flechas en el teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            if (selectedIndex < charactersPerPage - 1 && selectedIndex < characterList.length - 1) {
                selectedIndex++; // Mover la selección a la derecha
            } else if (currentPage < Math.ceil(characterList.length / charactersPerPage) - 1) {
                currentPage++; // Pasar a la siguiente página si se llega al final
                selectedIndex = 0; // Reiniciar la selección al inicio de la nueva página
            }
            renderCharacters(currentPage, selectedIndex); // Renderizar personajes
        } else if (event.key === 'ArrowLeft') {
            if (selectedIndex > 0) {
                selectedIndex--; // Mover la selección a la izquierda
            } else if (currentPage > 0) {
                currentPage--; // Volver a la página anterior si se llega al inicio
                selectedIndex = charactersPerPage - 1; // Mover la selección al final de la página anterior
            }
            renderCharacters(currentPage, selectedIndex); // Renderizar personajes
        }
    });
}