/**
 * Affichage et interactions avec la page index.html
 */

start();

function start() {
    getListProducts();
}

async function getListProducts() {
    let result = await kanapAPi.getListProducts();

    if(kanapAPi.isValidResult(result)) {
        setupUI(result);
    }
    else {
        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
}

function setupUI(listProduct){
    for(let product of listProduct){
        let card = CardsView.createIndexCard(new Product(product));
        
        updateUI(card);    
    }
}

function updateUI(card){
    document.getElementById("items").appendChild(card); 
}