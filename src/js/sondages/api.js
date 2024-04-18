const apiSondages = "https://inpoll-alexisfouquet.azurewebsites.net/sondages";

async function fetchSondages() {
    const recupSondages = await fetch(apiSondages);
    if(recupSondages.ok) {
        return await recupSondages.json();
    }
}

function afficherSondage() {
    const sondages = document.getElementById("container-sondages");

    fetchSondages().then(data => {
        data.forEach((items) => {
            const ids = items._id;
            sondages.innerHTML += `<div class="sondages">
                <h1 id='titre'>${items.titre}</h1>
                <p id='description'>${items.description}</p>
                <h3 id='niveau'>${items.niveau}</h3>
        </div>`
        });


    }).catch(err => {
        console.log(err);
    })
}

afficherSondage()
