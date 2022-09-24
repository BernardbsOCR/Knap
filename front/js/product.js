//************************************* */

function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response({"ok": true, "status": 200, "statusText": "File Loaded"});}
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
    console.log(error.statusText);
});

//************************************* */

let basePage;

function start() {
    initPage();

    getProductData();    
}

function initPage() {
    basePage = new KanapBasePage(Data.rootApiUrl);
}

async function getProductData() {
    let id = Data.getHrefPropertyValue("id");
    let product = [{"_id" : id}];
    let result = await basePage.kanapAPI.getListProductsData(product, "_id");

    if(result.ok) {
        setupUI(result.result[0]);
    }
    else {
        hideUI();

        basePage.showError(result.status, DialogMSG.MSG_ERROR_OCCURED);
    }     
}

//************************************* */

function setupUI(product) {
    basePage.storage.currentProductData = product;

    updateUI();  

    enableButtonListener();
}

function updateUI() {     
    document.getElementById("title").innerText = basePage.storage.currentProductData.name;
    document.getElementById("price").innerText = basePage.storage.currentProductData.price;
    document.getElementById("description").innerText = basePage.storage.currentProductData.description;
    
    let image = CardsView.createProductImage(basePage.storage.currentProductData.imageUrl, 
        basePage.storage.currentProductData.altTxt);

    document.querySelector(".item__img").appendChild(image);

    for (let color of basePage.storage.currentProductData.colors) {
        let option = CardsView.createProductColorOption(color);        
        document.getElementById("colors").appendChild(option);
    }       
}

function hideUI() {
    document.getElementById("title").innerText = DialogMSG.MSG_ERROR_NOT_FOUND;
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("colors").disabled = true;
    document.getElementById("quantity").disabled = true;
}

function resetFormUI() {
    document.getElementById("colors").value = "";
    document.getElementById("quantity").value = 0;
}

//************************************* */

function enableButtonListener() {
    document.getElementById("addToCart").addEventListener("click", onAddToCart);
}

function onAddToCart() {
    if (isValidForm()) {         
        addCurrentProduct();

        basePage.updateMenuCounterUI(); 

        showDialogPurchase();

        resetFormUI();
    }
}

function addCurrentProduct() {
    let id = Data.getHrefPropertyValue("id");
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    basePage.storage.addCurrentProduct(id, color, quantity);
}

function isValidForm() {
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);    

    if (color == "") {    
        showMessage("colors", DialogMSG.FORM_PRODUCT_ALERT_COLOR);   

        return false;
    }
    else if (quantity < 1 || quantity > 100) {     
        showMessage("quantity", DialogMSG.FORM_PRODUCT_ALERT_QUANTITY);

        return false;
    }

    return true;
}

//************************************* */

function showMessage(elementId, message) {
    basePage.alertDialog.showMessage(DialogMSG.FORM_PRODUCT_TITLE_REQUIRED_FIELD, message);

    document.getElementById(elementId).focus();
}

function showDialogPurchase() {
    let message = DialogMSG.getPurchaseMessage(basePage.storage.currentCartProduct, basePage.storage.currentProductData);
    let title = DialogMSG.getPurchaseTitle(basePage.storage.currentCartProduct);

    basePage.alertDialog.showMessage(title, message); 
}


    