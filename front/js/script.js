/**
 * Affichage et interactions avec la page index.html
 */

//************************************* */
Promise.all([
    loadFile("../js/models/products.js"),
    loadFile("../js/tools/data.js"),
    loadFile("../js/text/dialog_fr.js"),
    loadFile("../js/api/kanapApi.js"),
    loadFile("../js/views/alertDialogView.js"),
    loadFile("../js/views/productCounterView.js"),
    loadFile("../js/views/cardsView.js"),
    loadFile("../js/tools/storage.js"),
    loadFile("../js/basePage.js")
])
.then(() => {
    start();
});

function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response([{"ok": true, "status": 200, "statusText": "File Loaded"}]);}
        scriptEle.onerror = (e) => {response([{"ok": false, "status": 400, "statusText": "File not found"}]);}

        document.body.appendChild(scriptEle);
    });
}
//************************************* */

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
    else {
        showError("", DialogMSG.MSG_ERROR_OCCURED);
    }
}

//************************************* */

function setupUI(listProduct){
    for(let product of listProduct){
        let card = CardsView.createIndexCard(new ProductData(product));
        
        updateUI(card);    
    }
}

function updateUI(card){
    document.getElementById("items").appendChild(card); 
}