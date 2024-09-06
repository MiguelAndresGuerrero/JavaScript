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
                        <tr><th scope="col">Height:</th><td>${data.height}</th></tr>
                        <tr><th scope="col">Mass:</th><td>${data.mass}</th></tr>
                        <tr><th scope="col">Hair color:</th><td>${data.hair_color}</th></tr>
                        <tr><th scope="col">Skin color:</th><td>${data.skin_color}</th></tr>
                        <tr><th scope="col">Eye color:</th><td>${data.eye_color}</th></tr>
                        <tr><th scope="col">Birth year:</th><td>${data.birth_year}</th></tr>
                        <tr><th scope="col">Gender:</th><td>${data.gender}</th></tr>
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
        })
}