
const url6 = "https://ll.thespacedevs.com/2.2.0/event/previous/?date__lte=2023-11-19T14%3A12%3A09.791Z&limit=30";
const loader = document.getElementById('loader');
window.addEventListener("load", () => fetchEvents());

function reload() {
  
  window.location.reload();
}

async function fetchEvents() {

    const res = await fetch(url6);
    const data = await res.json();
    console.log(data);
    bindData(data.results);
    
}

function bindData(results) {
  const cardsContainer = document.getElementById("cards-container");
    const CardTemplate = document.getElementById("template-card");

    cardsContainer.innerHTML = "";

   results.forEach((results) => {
    if (!results.feature_image) return;
      const cardClone = CardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone,results);
        cardsContainer.appendChild(cardClone);
   });
}

function fillDataInCard(cardClone,results) {
 
    const Img = cardClone.querySelector("#img");
  const Title = cardClone.querySelector("#title");
    const CardCategoryText = cardClone.querySelector("#text-info");
    const date1  = cardClone.querySelector("#date");
   const BadgePrimary = cardClone.querySelector("#pri");
  
    const Carddescription  = cardClone.querySelector(".card-description");

    Img.src =results.feature_image;
    Title.innerHTML=results.name;
    Carddescription.innerHTML = results.description;
    BadgePrimary.innerHTML=results.location;
    CardCategoryText.innerHTML=results.type.name;
  const e="https://spacelaunchnow.me/event/";
  
    const date = new Date(results.date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
   date1.innerHTML = `${date}`;
  

   cardClone.firstElementChild.addEventListener("click", () => {
        window.open(`${e}${results.slug}/`);
        reload();
    });
  
}

