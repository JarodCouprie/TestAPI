const adresse = document.querySelector("#input-adresse");
const ville = document.querySelector("#input-ville");
const codePostal = document.querySelector("#input-code-postal");
const list = document.querySelector("#features-list");
adresse.addEventListener("keyup", (e) =>{
    let value = e.target.value;
    list.innerHTML = "";
    if (value.length >= 3){
        fetch("https://api-adresse.data.gouv.fr/search/?q="+value)
            .then(response => response.json())
            .then(data => {
                // parcours des résultats et ajout à la liste
            data.features.map(item => {
                const li = document.createElement("li");
                li.textContent = item.properties.name;
                li.dataset.city = item.properties.city;
                li.dataset.postcode = item.properties.postcode;
                list.append(li);
                li.addEventListener("click", (e) => {
                    adresse.value = e.target.textContent;
                    ville.value = e.target.dataset.city;
                    codePostal.value = e.target.dataset.postcode;
                    list.innerHTML = "";
                })
            })
        })
    }
})