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
    printCart();
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
        //console.log(arrayUrl);
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
        btnBuy.setAttribute("onclick", `buyItem(${(i)})`)
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


function buyItem(elemento) {
    let localJson = [];
    let selectedObject = { ...arrayUrl[elemento] };

    if (!localStorage.getItem("CART")) {
        //.log("enterTRUE");
        localJson.push(selectedObject);
        //.log(localJson);
        localStorage.setItem("CART", JSON.stringify(localJson));
        printCart();
    } else {
        //.log("enterFalse");
        let data = JSON.parse(localStorage.getItem("CART"));
        localJson = data;
        localJson.push(selectedObject);
        //console.log(localJson);
        localStorage.setItem("CART", JSON.stringify(localJson));
        printCart();
    };

};

function printCart() {
    let cartShoppingList = document.getElementById("cartShoppingList");
    let cardWrapper = document.createElement("div");
    let localJson = [];

    localJson = JSON.parse(localStorage.getItem("CART"));
    for(let i = 0; i< localJson.length; i++){
    cardWrapper.setAttribute("id",`cardWrapper${i}`)
    cardWrapper.innerHTML = `
                 <div>
                 <div class="card mb-3 border-1 rounded-0">
                   <div class="row g-0">
                     <div class="card-body">
                       <div class="row">
                         <img
                           src="${localJson[i].img}"
                           class="img-fluid rounded-start col-4"
                           alt="FotoCopertinaLibro"
                         />
                         <p class="card-title fw-bold col-8">${localJson[i].title}</p>
                       </div>
                     </div>
                     <div class="card-footer bg-transparent d-flex justify-content-between">
                       <p class="card-text">PREZZO:${localJson[i].price}€</p>
                       <button type="button" class="btn bg-body-secondary" id="button${i}">
                         <i class="bi bi-trash"></i>
                       </button>
                     </div>
                   </div>
                 </div>
                 </div> `;
    let button = document.getElementById(`button${i}`);
    cardWrapper.setAttribute("id",`cardWrapper${i}`);

    cartShoppingList.appendChild(cardWrapper);
};
};

function deleteCartItem(idcard){
    let id = document.getElementById(idcard);
    console.log(id);
    
    //toDelete.remove();    

}

function deleteAllCart(e){
    e.preventDefault();
    let cartShoppingList = document.getElementById("cartShoppingList");
    cartShoppingList.innerHTML= "";
    localStorage.removeItem("CART");
};





