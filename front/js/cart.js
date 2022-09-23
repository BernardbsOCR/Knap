//************************************* */
Promise.all([
    loadFile("../js/models/products.js"),
    loadFile("../js/models/contact.js"),
    loadFile("../js/tools/data.js"),
    loadFile("../js/text/dialog_fr.js"),
    loadFile("../js/api/kanapApi.js"),
    loadFile("../js/views/forms.js"),
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

let form;

function start() {
    checkFormUIVisibility(storage.clientCart.length);    

    getListProductsData();
}

//************************************* */

async function getListProductsData() {
    let result = await kanapAPi.getListProductsData(storage.clientCart, "_id");

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

function setupUI(productsData) {
    updateCartProductsData(productsData);

    createCards();

    updateUI();

    createOrderForm();
}

function updateCartProductsData(productsData) {    
    storage.cartProductsData = productsData;
}

function createCards() {
    if (storage.cartProductsData != undefined && storage.cartProductsData.length > 0) {
        for(let i = 0; i < storage.cartProductsData.length; i++) {
            let card = createItemCard(i);

            addItemCard(card);
        
            addItemCardListener(card);
        }
    }    
}

function createItemCard(id) {
    return CardsView.createCartCard(   
        storage.clientCart[id].num, 
        storage.cartProductsData[id], 
        storage.clientCart[id].quantity, 
        storage.clientCart[id].color);
}

function addItemCard(card) {
    document.getElementById("cart__items").appendChild(card);
}

function addItemCardListener(card) {
    card.querySelector(".deleteItem").addEventListener('click', onItemDeleteListener);
    card.querySelector("input").addEventListener('change', onItemCountListener);
}

//************************************* */

function updateUI() {
    document.getElementById("totalQuantity").innerText = storage.productsCount;
    document.getElementById("totalPrice").innerText = storage.totalPrice;

    updateMenuCounterUI();
}

function checkFormUIVisibility(count) {
    let title;

    if (count > 0) {
        title = "Votre Panier";
        document.querySelector(".cart__price").style.display = "initial";
        document.querySelector("form").style.display = "initial";
    }
    else {
        title = "Votre Panier est vide!";
        document.querySelector(".cart__price").style.display = "none";
        document.querySelector("form").style.display = "none";
    }

    document.querySelector("#cartAndFormContainer h1").innerText = title;
}

//************************************* */

function onItemDeleteListener(event) {
    removeItem(getItemId(event), event);   
    
    updateUI();

    checkFormUIVisibility(storage.productsCount);
}

function removeItem(itemId, event) {
    storage.removeProduct(itemId);

    removeCardUI(event.target.closest("#cart__item_" + itemId));      
}

function removeCardUI(card) {
    document.getElementById("cart__items").removeChild(card);
}

//************************************* */

function onItemCountListener(event) {
    let itemId = getItemId(event);
    let quantity = event.target.value;

    if (quantity >= 1 && quantity <= 100) {
        storage.updateProductQuantity(itemId, quantity);

        updateUI();
    }
    else {
        showFormMessage(event.target.id, 
            DialogMSG.FORM_PRODUCT_TITLE_INVALID_QUANTITY, 
            DialogMSG.FORM_PRODUCT_ALERT_QUANTITY);
    }
}

function showFormMessage(elementId, title, message) {
    alertDialog.showMessage(title, message); 

    document.getElementById(elementId).focus();
}

//************************************* */

function getItemId(event) {
    let id = event.target.id;
    id = id.substring(id.length - 1);   

    return parseInt(id);
}

function getCardQuantity(card) {
    return card.querySelector("input").getAttribute("value");
}

function getCardPrice(card) {
    return parseInt(card.querySelector(".cart__item__content__description :nth-child(3)").innerText);
}

//************************************* */

function createOrderForm() {
    let formView = document.querySelector("form");
    let formOrderFieldsText = Data.getFormOrderFieldsText(DialogMSG.getFormOrderErrorText());

    form = new FormOrderCart(formView, formOrderFieldsText);

    addOrderFormListener(formView);
}

function addOrderFormListener(formView) {  
    formView.addEventListener("input", (event) => {    
        onFieldChange(event.target);
    });

    formView.addEventListener("submit", (event) => {   
        event.preventDefault(); 

        onSubmit();
    });
}

function onFieldChange(target) {  
    let isValidField = form.checkField(target) ? true : false;

    let message = isValidField ? "" : form.getErrorMessage(target.id);

    form.setErrorFieldText(target, message);
}

function onSubmit() {  
    let contact = form.getClientContactData();
    let products = storage.cartProductsData;

    let submitSummary = {};
    submitSummary.contact = contact;
    submitSummary.products = products;

    console.log("submitSummary before");
    console.log(submitSummary);

    submitOrder(submitSummary);   
}

async function submitOrder(submitSummary) {
    let result = await kanapAPi.submitOrder(submitSummary);

    console.log("response submitOrder");
    console.log(result);

    if(result.length > 0 && result[0].errorType != undefined) {
        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        confirmOrder(result);
    }
    else {
        showError("", DialogMSG.MSG_ERROR_OCCURED);
    }
}

function confirmOrder(result) {
    console.log("response submitOrder");
    console.log(result.orderId);

    
}


