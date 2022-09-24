//************************************* */

function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response({"ok": true, "status": 200, "statusText": "success"});}
        scriptEle.onerror = (e) => {response({"ok": false, "status": 400, "statusText": "File not found"});}

        document.body.appendChild(scriptEle);
    });
}

Promise.all([
    loadFile("../js/models/products.js"),
    loadFile("../js/tools/data.js"),
    loadFile("../js/text/dialog_fr.js"),
    loadFile("../js/api/kanapApi.js"),
    loadFile("../js/views/alertDialogView.js"),
    loadFile("../js/views/CounterView.js"),
    loadFile("../js/views/cardsView.js"),
    loadFile("../js/tools/storage.js"),
    loadFile("../js/basePage.js")
])
.then(() => {
    start();
})
.catch((error) => {
    console.log("********loadFile********");
    console.log(error);
});

//************************************* */

let basePage;

function start() {
    initPage();

    getListProducts();
}

function initPage() {
    basePage = new KanapBasePage(Data.rootApiUrl);
}

async function getListProducts() {
    let result = await basePage.kanapAPI.getListProducts();

    if(result.ok) {
        updateUI(result.result);
    }
    else{
        basePage.showError(result.statusText, DialogMSG.MSG_ERROR_OCCURED);
    }
}

//************************************* */

function updateUI(listProduct){
    for(let product of listProduct){
        let card = CardsView.createIndexCard(new ProductData(product));
        
        document.getElementById("items").appendChild(card);    
    }
}