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
    getProductData();    
}

function getProductId() {
    return Data.getHrefPropertyValue("id");
}

async function getProductData() {
    let product = [{"_id" : getProductId()}];
    let result = await kanapAPi.getListProductsData(product, "_id");

    if(result.length > 0 && result[0].errorType != undefined) {
        hideUI();

        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        setupUI(result[0]);
    }
    else {
        hideUI();

        showError("", DialogMSG.MSG_ERROR_OCCURED);
    }
}

//************************************* */

function setupUI(product) {
    storage.currentProductData = product;

    updateUI();  

    enableButtonListener();
}

function updateUI() {     
    document.getElementById("title").innerText = storage.currentProductData.name;
    document.getElementById("price").innerText = storage.currentProductData.price;
    document.getElementById("description").innerText = storage.currentProductData.description;
    
    let image = CardsView.createProductImage(storage.currentProductData.imageUrl, 
        storage.currentProductData.altTxt);

    document.querySelector(".item__img").appendChild(image);

    for (let color of storage.currentProductData.colors) {
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

        updateMenuCounterUI(); 

        showDialogPurchase();

        resetFormUI();
    }
}

function addCurrentProduct() {
    let id = getProductId();
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    storage.addCurrentProduct(id, color, quantity);
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
    alertDialog.showMessage(DialogMSG.FORM_PRODUCT_TITLE_REQUIRED_FIELD, message); 
    document.getElementById(elementId).focus();
}

function showDialogPurchase() {
    let message = DialogMSG.getPurchaseMessage(storage.currentCartProduct, storage.currentProductData);
    let title = DialogMSG.getPurchaseTitle(storage.currentCartProduct);

    alertDialog.showMessage(title, message); 
}


    