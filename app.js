// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error_msg");
const resultsDisplay = document.querySelector(".results_display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    if (!input.value === "") {
        errorMsg.textContent = "Oops, veuillez effectuer votre recherche";
        return;
    } else {
        errorMsg;
        textContent = "";
        loader.style.display = "flex";
        resultsDisplay.textContent = "";
        wikiApiCall(input.value);
    }
}
async function wikiApiCall(searchInput) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
        );
        //Si on a une erreur réseau
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        createCards(data.query.search);
    } catch (error) {
        errorMsg.textContent = `${error}`;
        loader.style.display = "none";
    }
}

function createCards(data) {
    if (!data.length) {
        errorMsg.textContent = "Oops, auncun résultat";
        loader.style.display = "none";
        return;
    }
    data.forEach((el) => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
        const card = document.createElement("div");
        card.className = "result_item";
        card.innerHTML = `
          <h3 class="result_title">
            <a href=${url} target="_blank">${el.title}</a>
          </h3>
          <a href=${url} class="result_link" target="_blank">${url}</a>
          <span class="result_snippet">${el.snippet}</span>
          <br>
        `;
        resultsDisplay.appendChild(card);
    });
    loader.style.display = "none";
}
