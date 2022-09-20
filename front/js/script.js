/**
 * Affichage et interactions avec la page index.html
 */

start();

function start() {
    getProductsList();
}

function getProductsList() {
    fetch ("http://localhost:3000/api/products")
    .then (data => {
        return data.json();
    })
    .then (jsonListProduct => {
        if (jsonListProduct != undefined && jsonListProduct.length > 0) {
            createProductCards(jsonListProduct);
        }
        else {
            showError();
        }
        
    })
    .catch((error) => {
        showError();
    });
}

function showError() {
    alertDialog.showErrorCode("404", "Oops! Une erreur est survenue");
}

function createProductCards(jsonListProduct){
    for(let jsonProduct of jsonListProduct){
        let card = CardsView.getIndexCard(new Product(jsonProduct));
        
        updateUI(card);    
    }
}

function updateUI(card){
    document.getElementById("items").appendChild(card); 
}