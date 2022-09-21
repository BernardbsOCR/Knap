/**
 * Affichage et interactions avec la page index.html
 */

start();

function start() {
    getListProducts();
}

async function getListProducts() {
    let result = await kanapAPi.getListProducts();

    if(result == undefined || result[0].errorType != undefined) {
        showError(result[0].errorType, "Oops! Une erreur est survenue");
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        createProductCards(result);
    }
}

function createProductCards(listProduct){
    for(let product of listProduct){
        let card = CardsView.createIndexCard(new Product(product));
        
        updateUI(card);    
    }
}

function updateUI(card){
    document.getElementById("items").appendChild(card); 
}