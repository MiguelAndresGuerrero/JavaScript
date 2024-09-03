function search_ID() {
    let search = document.getElementById("Search").ariaValueMax.trim();
    if (search === "") {
        alert ("Pokemon no encontrado :( ");
        return;
    }

    let URL = `https://pokeapi.co/api/v2/pokemon/${search}/`;

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        if (!data.pokemon) {
            document.getElementById("view").innerHTML = `<p>Pokemon no encontrado</p>`;
            return;
        }

        let pokemonHTML = `
            <p>${data.URL}</p>
        `
    })
}