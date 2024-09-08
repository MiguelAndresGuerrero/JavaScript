function search_Id() {
    let search = document.getElementById("enterId").value.trim();
    if (search === "") {
        alert("ID inválido :(");
        return;
    }

    let URL = `https://swapi.dev/api/people/${search}/`;


    fetch(URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Personaje no encontrado');
            }
            return res.json();
        })
        .then(data => {
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

            return Promise.all([
                fetch(data.homeworld).then(res => res.json()),
                Promise.all(data.films.map(film => fetch(film).then(res => res.json()))),
                Promise.all(data.species.map(specie => fetch(specie).then(res => res.json()))),
                Promise.all(data.vehicles.map(vehicle => fetch(vehicle).then(res => res.json()))),
                Promise.all(data.starships.map(starship => fetch(starship).then(res => res.json())))
            ]);
        })
        .then(([planetData, filmsData, speciesData, vehiclesData, starshipsData]) => {
            if (planetData) {
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
            }

            if (filmsData.length > 0) {
                let filmsHTML = `
                    <h3>Films</h3>
                    <table class="table table-dark">
                        ${filmsData.map(film => `
                            <tr><th scope="col">Title:</th><td>${film.title} (${film.release_date})</td></tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById("films").innerHTML = filmsHTML;
            }

            if (speciesData.length > 0) {
                let speciesHTML = `
                    <h3>Species</h3>
                    <table class="table table-dark">
                        ${speciesData.map(specie => `
                            <tr><th scope="col">Name:</th><td>${specie.name}</td></tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById("species").innerHTML = speciesHTML;
            }

            if (vehiclesData.length > 0) {
                let vehiclesHTML = `
                    <h3>Vehicles</h3>
                    <table class="table table-dark">
                        ${vehiclesData.map(vehicle => `
                            <tr><th scope="col">Name:</th><td>${vehicle.name}</td></tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById("vehicle").innerHTML = vehiclesHTML;
            }

            if (starshipsData.length > 0) {
                let starshipsHTML = `
                    <h3>Starships</h3>
                    <table class="table table-dark">
                        ${starshipsData.map(starship => `
                            <tr><th scope="col">Name:</th><td>${starship.name}</td></tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById("starships").innerHTML = starshipsHTML;
            }
        })
        .catch(error => {
            document.getElementById("view").innerHTML = `<p>${error.message}</p>`;
        });
}