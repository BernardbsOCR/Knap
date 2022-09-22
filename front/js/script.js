/**
 * Affichage et interactions avec la page index.html
 */

start();

function start() {
    getListProducts();
}

async function getListProducts() {
    let result = await kanapAPi.getListProducts();

    if(result.length > 0 && result[0].errorType != undefined) {
        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        setupUI(result);
    }
}

function setupUI(listProduct){
    for(let product of listProduct){
        let card = CardsView.createIndexCard(new ProductData(product));
        
        updateUI(card);    
    }
}

function updateUI(card){
    document.getElementById("items").appendChild(card); 
}