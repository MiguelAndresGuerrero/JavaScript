function search_Id() {
    let search = document.getElementById("enterId").value.trim();
    if (search === "") {
        alert("ID invalido :(");
        return;
    }

    let URL = `https://swapi.py4e.com/api/people/${search}/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (!data.name) {
                document.getElementById("view").innerHTML = `<p>Personaje no encontrado</p>`;
                return;
            }

            let characterHTML = `
                <h2>${data.name} (ID: ${search})</h2>
                <table class="table table-dark">
                    <tr><th scope="col">Name:</th><td>${data.name}</td></tr>
                    <tr><th scope="col">Height:</th><td>${data.height}</td></tr>
                    <tr><th scope="col">Mass:</th><td>${data.mass}</td></tr>
                    <tr><th scope="col">Hair color:</th><td>${data.hair_color}</td></tr>
                    <tr><th scope="col">Skin color:</th><td>${data.skin_color}</td></tr>
                    <tr><th scope="col">Eye color:</th><td>${data.eye_color}</td></tr>
                    <tr><th scope="col">Birth year:</th><td>${data.birth_year}</td></tr>
                    <tr><th scope="col">Gender:</th><td>${data.gender}</td></tr>
                </table>
            `;
            document.getElementById("view").innerHTML = characterHTML;

            return fetch(data.homeworld).then(res => res.json());
        })
        .then(planetData => {
            if (!planetData) return;

            let planetHTML = `
                <h3>Homeworld</h3>
                <table class="table table-dark">
                    <tr><th scope="col">Name:</th><td>${planetData.name || 'undefined'}</td></tr>
                    <tr><th scope="col">Rotation:</th><td>${planetData.rotation_period || 'undefined'}</td></tr>
                    <tr><th scope="col">Orbital:</th><td>${planetData.orbital_period || 'undefined'}</td></tr>
                    <tr><th scope="col">Diameter:</th><td>${planetData.diameter || 'undefined'}</td></tr>
                    <tr><th scope="col">Climate:</th><td>${planetData.climate || 'undefined'}</td></tr>
                    <tr><th scope="col">Gravity:</th><td>${planetData.gravity || 'undefined'}</td></tr>
                    <tr><th scope="col">Terrain:</th><td>${planetData.terrain || 'undefined'}</td></tr>
                    <tr><th scope="col">Surface water:</th><td>${planetData.surface_water || 'undefined'}</td></tr>
                    <tr><th scope="col">Population:</th><td>${planetData.population || 'undefined'}</td></tr>
                </table>
            `;
            document.getElementById("view").innerHTML += planetHTML;
        })
        .then(() => {
            return Promise.all([
                fetch(`${URL}films/`).then(res => res.json()),
                fetch(`${URL}species/`).then(res => res.json()),
                fetch(`${URL}vehicles/`).then(res => res.json()),
                fetch(`${URL}starships/`).then(res => res.json()),
            ]);
        })
        .then(([filmsData, speciesData, vehiclesData, starshipsData]) => {

            let filmsHTML = '<h3>Films</h3><ul>';
            filmsData.forEach(film => {
                filmsHTML += `<li>${film.title || 'undefined'}</li>`;
            });
            filmsHTML += '</ul>';
            document.getElementById("view").innerHTML += filmsHTML;

            let speciesHTML = '<h3>Species</h3><ul>';
            speciesData.forEach(specie => {
                speciesHTML += `<li>${specie.name || 'undefined'}</li>`;
            });
            speciesHTML += '</ul>';
            document.getElementById("view").innerHTML += speciesHTML;

            let vehiclesHTML = '<h3>Vehicles</h3><ul>';
            vehiclesData.forEach(vehicle => {
                vehiclesHTML += `<li>${vehicle.name || 'undefined'}</li>`;
            });
            vehiclesHTML += '</ul>';
            document.getElementById("view").innerHTML += vehiclesHTML;

            let starshipsHTML = '<h3>Starships</h3><ul>';
            starshipsData.forEach(starship => {
                starshipsHTML += `<li>${starship.name || 'undefined'}</li>`;
            });
            starshipsHTML += '</ul>';
            document.getElementById("view").innerHTML += starshipsHTML;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("view").innerHTML = `<p>Error al obtener datos :(</p>`;
        });
}