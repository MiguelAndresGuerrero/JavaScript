function search_Id() {
    let search = document.getElementById("enterId").value.trim();
    if (search === "") {
        alert("ID invalido :( ");
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
                    <tr><th scope="col">Hair Color:</th><td>${data.hair_color}</td></tr>
                    <tr><th scope="col">Skin Color:</th><td>${data.skin_color}</td></tr>
                    <tr><th scope="col">Eyes Color:</th><td>${data.eye_color}</td></tr>
                    <tr><th scope="col">Birth Year:</th><td>${data.birth_year}</td></tr>
                    <tr><th scope="col">Gender:</th><td>${data.gender}</td></tr>
                </table>
            `;
            document.getElementById("view").innerHTML = characterHTML;

            return fetch(data.homeworld)
            .then(res => res.json())
            .then(planetData => ({ data, planetData }));
        })
        .then(({ data, planetData }) => {
            if (!planetData) return;

            let planetHTML = `
                <h3>Homeworld</h3>
                <table class="table table-dark">
                    <tr><th scope="col">Name:</th><td>${planetData.name || 'undefined'}</td></tr>
                    <tr><th scope="col">Rotation:</th><td>${planetData.rotation_period || 'undefined'}</td></tr>
                    <tr><th scope="col">Orbital:</th><td>${planetData.orbital_period || 'undefined'}</td></tr>
                    <tr><th scope="col">Daiameter:</th><td>${planetData.diameter || 'undefined'}</td></tr>
                    <tr><th scope="col">Climate:</th><td>${planetData.climate || 'undefined'}</td></tr>
                    <tr><th scope="col">Gravity:</th><td>${planetData.gravity || 'undefined'}</td></tr>
                    <tr><th scope="col">Terrain:</th><td>${planetData.terrain || 'undefined'}</td></tr>
                    <tr><th scope="col">Surface water:</th><td>${planetData.surface_water || 'undefined'}</td></tr>
                    <tr><th scope="col">Population:</th><td>${planetData.population || 'undefined'}</td></tr>
                    <tr><th scope="col">Created:</th><td>${planetData.created || 'undefined'}</td></tr>
                    <tr><th scope="col">Edited:</th><td>${planetData.edited || 'undefined'}</td></tr>
                    <tr><th scope="col">Url:</th><td>${planetData.url || 'undefined'}</td></tr>
                </table>
            `;
            document.getElementById("view").innerHTML += planetHTML;
            return fetch(`https://swapi.py4e.com/api/films/`).then(res => res.json()).then(filmsData => ({ data, filmsData }));
        })
        .then(({ data, filmsData }) => {
            if (!filmsData.results) return;

            let filmsHTML = `<h3>Films</h3><table class="table table-dark"><tbody>`;
            filmsData.results.forEach(film => {
                if (data.films.includes(film.URL)) {
                    filmsHTML += `<tr><th scope="col">${film.title}</th><td>(Fecha: ${film.release_date})</td></tr>`;
                }
            });
            filmsHTML += '</tbody></table>';
            document.getElementById("view").innerHTML += filmsHTML;
            return fetch(`//https://swapi.py4e.com/api/vehicles/`).then(res.json()).then(vehiclesData => ({data, vehiclesData}));
        })
        .then(({ data, starshipsData }) => {
            if (!starshipsData.results) return;

            let vehiclesHTML = `<h3>Starships</h3><table class="table table-dark"><tbody>`;
            starshipsData.results.forEach(starships => {
                if (data.vehicles.includes(starships.URL)) {
                    vehiclesHTML += `<tr><th scope="col">${starships.title}</th><td>`
                }
            })
        })


        .catch(error => {
            document.getElementById("view").innerHTML = `<p>Error al cargar datos :( ${error}</p>`;
        });

}