//❌Recupero i dati dal db tramite fetch"get" e li inserisco nel mio array vuoto 
//❌Prendo i dati relativi ai vari campi e E li indirizzo dentro una funzione per la creazioen delle carte
//❌Dopo Istanza Card generero il file Html x volte quante oggetti sono prensenti dell' array popolato dall'APi
//❌Inserisco nelle card i vari campi - gli Id saranno //elemento-numeroId
//❌Creo e Collego il bottone scarta con id alla carta e alla funzione di deleteItem
//❌Funzione deleteItem() per andare a spliceare quella carta dal mio array(API) e mettere display None quella carta
//GLI EXTRA PENSO DOPO

let cardContainer = document.getElementById("cardContainer");


const url = "https://striveschool-api.herokuapp.com/books";
let arrayUrl = [];                  //DICHIARO IL MIO ARRAY VUOTO CHE VERRA POPOLATO CON LA BASE DATI

document.addEventListener("load", init());

function init() {
    recoverData();

};


async function recoverData() {
    await fetch(url, {               //FA UN RICHIESTA GET PER OTTENERE IL CONTENUTO DELLA URL
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then(function (response) {               //TRASFORMA LA RISPOSTA DATA DAL GET IN UN JSON(arrayOggetti con tutti dati) E LI ACCOPPIA ALLA VARIABILE DATI E FA IL RETURN 
        let dati = response.json();
        return dati;
    }).then(function (dati) {                   //ENTRA COME PARAMETRO IL RETURN DEL .THEN PRECEDENTE E ESEgue il codice nella funzione
        arrayUrl = dati;                        //Popola l'array vuoto con tutto la risposta trasformata in JSON ottenuta tramite la get
        console.log(arrayUrl);
        createCard();                           //CHIAMA LA FUNZIONE CHE CREERA' LE CARD   
    }).catch(function () {
        console.log("ERRORE ");
    });
};



function createCard() {
    cardContainer.innerHTML = ""
    for (let i = 0; i < arrayUrl.length; i++) {
        let cardWrap = document.createElement("div");
        let newCard = document.createElement("div");
        let newCardBody = document.createElement("div");
        let newImg = document.createElement("img");
        let newTitle = document.createElement("h5");
        let newCategory = document.createElement("p");
        let newPrice = document.createElement("p");
        let btnBuy = document.createElement("button");
        let btnDelete = document.createElement("button");

        let arrayAsin = arrayUrl[i].asin;


        newTitle.setAttribute("class", "card-title");                   //ERA MEGLIO USARE TUTTI INNER HTML PER RISPARMIARE CODICE
        newTitle.innerText = arrayUrl[i].title;

        newCategory.setAttribute("class", "badge rounded-pill bg-black");  
        newCategory.innerText = arrayUrl[i].category;

        newPrice.setAttribute("class", "card-text")
        newPrice.innerText = `PRICE: ${arrayUrl[i].price}€`;

        btnBuy.setAttribute("class", "btn btn-outline-success");
        btnBuy.setAttribute("onclick",`buyItem(${arrayAsin.toString()})`)
        btnBuy.innerText = "Buy Now";

        btnDelete.setAttribute("class", "btn btn-outline-danger");
        //btnDelete.setAttribute("onclick", `deleteItem(${arrayUrl[i].asin})`);         //CREA BUG READING NULL
        btnDelete.setAttribute("onclick", `deleteItem(${i})`);
        btnDelete.innerText = "Scarta";

        newCardBody.setAttribute("class", "card-body");
        newCardBody.append(newTitle, newCategory, newPrice, btnBuy, btnDelete);

        newImg.setAttribute("src", arrayUrl[i].img);
        newImg.setAttribute("class", "card-img-top img-fluid");

        newCard.setAttribute("class", "card");
        newCard.append(newImg, newCardBody);

        cardWrap.setAttribute("class", "col-sm-5 col-lg-3");
        //cardWrap.setAttribute("id", arrayUrl[i].asin);                                //CREA BUG READING NULL
        cardWrap.setAttribute("id", i);
        cardWrap.appendChild(newCard);
        cardContainer.appendChild(cardWrap);
    }
};

function deleteItem(value) {
    //console.log(value);
    let toDelete = document.getElementById(value);
    //console.log(toDelete);
    toDelete.remove();
}


function buyItem(asin){
    let cartShoppingList = document.getElementById("cartShoppingList");
    let cardWrapper = document.createElement("div");
    let selectedObject;

    
    arrayUrl.forEach(element => {
        if(element.asign == asin){
            selectedObject = {...element};
        }
        return;
    });

    console.log(selectedObject);


    cardWrapper.innerHTML = `
                <div id="cardWrapper">
                <div class="card mb-3 border-1 rounded-0">
                  <div class="row g-0">
                    <div class="card-body">
                      <div class="row">
                        <img
                          src="${asin}"
                          class="img-fluid rounded-start col-4"
                          alt="..."
                        />
                        <p class="card-title fw-bold col-8">${asin}</p>
                      </div>
                    </div>
                    <div class="card-footer bg-transparent d-flex justify-content-between">
                      <p class="card-text">PREZZO:${asin}€</p>
                      <button type="button" class="btn bg-body-secondary">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                </div> `
    cartShoppingList.appendChild(cardWrapper);
}



