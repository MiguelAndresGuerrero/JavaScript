function search_Id() {
    let search = document.getElementById("enterId").value.trim();
    if (search === "") {
        alert("ID inválido :(");
        return;
    }

    let URL = `https://rickandmortyapi.com/api/character/${search}/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (!data.name) {
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
            document.getElementById("view").innerHTML = characterHTML;

            // Inicialmente ocultar los botones de navegación
            document.getElementById("episode-nav").style.display = "none";

            // Obtener y mostrar episodios
            let allEpisodes = [];
            data.episode.forEach(episodeURL => {
                fetch(episodeURL)
                    .then(res => res.json())
                    .then(episodeData => {
                        allEpisodes.push(episodeData);
                        if (allEpisodes.length === data.episode.length) {
                            displayEpisode(allEpisodes, 0);
                        }
                    });
            });
        })
        .catch(error => {
            document.getElementById("view").innerHTML = `<p>Error al cargar los datos :( ${error}</p>`;
        });
}

// buscar al presionar la tecla Enter
document.getElementById("enterId").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search_Id();
    }
});

function displayEpisode(episodes, currentEpisodeIndex) {
    if (currentEpisodeIndex < 0 || currentEpisodeIndex >= episodes.length) return;

    let episode = episodes[currentEpisodeIndex];
    let episodeHTML = `
        <div class="episode-item">
            <h4>${episode.name} (${episode.episode})</h4>
            <p>Air Date: ${episode.air_date}</p>
            <ul class="character-list"></ul>
        </div>
    `;
    document.getElementById("episode-content").innerHTML = episodeHTML;

    let episodeCharacterList = [];
    episode.characters.forEach(characterURL => {
        fetch(characterURL)
            .then(res => res.json())
            .then(characterData => {
                episodeCharacterList.push({
                    name: characterData.name,
                    image: characterData.image
                });
                
                if (episodeCharacterList.length === episode.characters.length) {
                    displayCharacterList(episodeCharacterList);
                }
            });
    });

    // Mostrar los botones de navegación
    document.getElementById("episode-nav").style.display = "block";

    // Manejar la navegación entre episodios
    document.getElementById("prevEpisode").onclick = () => {
        if (currentEpisodeIndex > 0) {
            displayEpisode(episodes, currentEpisodeIndex - 1);
        }
    };
    document.getElementById("nextEpisode").onclick = () => {
        if (currentEpisodeIndex < episodes.length - 1) {
            displayEpisode(episodes, currentEpisodeIndex + 1);
        }
    };
}

function displayCharacterList(characterList) {
    const charactersPerPage = 5;
    let currentPage = 0;
    let selectedIndex = 0;

    function renderCharacters(page, selectedIdx) {
        let start = page * charactersPerPage;
        let end = start + charactersPerPage;
        let visibleCharacters = characterList.slice(start, end);

        let characterHTML = `<ul>`;
        visibleCharacters.forEach((character, index) => {
            const isSelected = index === selectedIdx ? 'selected' : '';
            characterHTML += `
                <li class="character-item ${isSelected}" data-index="${index}">
                    <img src="${character.image}" alt="${character.name}" style="width: 50px; height: 50px;">
                    <p>${character.name}</p>
                </li>`;
        });
        characterHTML += `</ul>`;
        document.querySelector('.character-list').innerHTML = characterHTML;
    }

    renderCharacters(currentPage, selectedIndex);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            if (selectedIndex < charactersPerPage - 1 && selectedIndex < characterList.length - 1) {
                selectedIndex++;
            } else if (currentPage < Math.ceil(characterList.length / charactersPerPage) - 1) {
                currentPage++;
                selectedIndex = 0;
            }
            renderCharacters(currentPage, selectedIndex);
        } else if (event.key === 'ArrowLeft') {
            if (selectedIndex > 0) {
                selectedIndex--;
            } else if (currentPage > 0) {
                currentPage--;
                selectedIndex = charactersPerPage - 1;
            }
            renderCharacters(currentPage, selectedIndex);
        }
    });
}