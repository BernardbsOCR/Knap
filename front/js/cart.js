//************************************* */

/**
 * Create a promise to add a "script" element in the document body
 * 
 * @param {String} file Source of the file to load
 * @returns {Promise} The Promise's response
 */
function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response([{"ok": true, "status": 200, "statusText": "File Loaded"}]);}
        scriptEle.onerror = (e) => {response([{"ok": false, "status": 400, "statusText": "File not found"}]);}

        document.body.appendChild(scriptEle);
    });
}

/**
 * Chain of Promise {addJSScript}
 */
Promise.all([
    loadFile("../js/models/products.js"),
    loadFile("../js/models/contact.js"),
    loadFile("../js/tools/data.js"),
    loadFile("../js/text/dialog_fr.js"),
    loadFile("../js/api/kanapApi.js"),
    loadFile("../js/views/forms.js"),
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

//** @type {BasePage} */
let basePage;
//** @type {FormOrderCart} */
let form;

/**
 * Start JS code
 */
function start() {
    initPage();
    
    checkClientFormVisibility(basePage.storage.clientCart.length);    

    getListProductsData();
}

/**
 * Create instance of {basePage}
 */
function initPage() {
    basePage = new KanapBasePage(Data.rootApiUrl);
}

//************************************* */

/**
 * Create products data list and update UI
 * @async
 */
async function getListProductsData() {
    // Start Promise to get list of products data
    let result = await basePage.kanapAPI.getListProductsData(basePage.storage.clientCart, "_id");

    // Check Promise response
    if(result.ok) {
        saveCartProductsData(result.result);

        setupUI();
    }
    else {
        // Display the error message on the user interface
        basePage.showError(result.status, DialogMSG.MSG_ERROR_OCCURED);
    }
}

//************************************* */

/**
 * Update user interface
 * 
 * @param {array.<ProductData>} product 
 */
function setupUI() {
    createCards();

    initOrderForm();

    updateUI();
}

/**
 * Update User interface
 */
function updateUI() {
    document.getElementById("totalQuantity").innerText = basePage.storage.productsCount;
    document.getElementById("totalPrice").innerText = basePage.storage.totalPrice;

    basePage.updateCartCounterProduct();
}

/**
 * Save list of products data on {storage} instance
 * 
 * @param {array.<ProductData>} productsData 
 */
function saveCartProductsData(productsData) {    
    basePage.storage.cartProductsData = productsData;
}

/**
 * Create card elements items "article" for UI
 */
function createCards() {
    if (basePage.storage.cartProductsData != undefined && basePage.storage.cartProductsData.length > 0) {
        for(let i = 0; i < basePage.storage.cartProductsData.length; i++) {
            let card = createItemCard(i);

            addItemCard(card);
        
            addItemCardListener(card);
        }
    }    
}

/**
 * Create new cart card "article" Object
 * @param {String} id 
 * @returns {Object}
 */
function createItemCard(id) {
    return CardsView.createCartCard(   
        basePage.storage.clientCart[id].num, 
        basePage.storage.cartProductsData[id], 
        basePage.storage.clientCart[id].quantity, 
        basePage.storage.clientCart[id].color);
}

/**
 * Add card element Object on UI
 * @param {Object} card 
 */
function addItemCard(card) {
    document.getElementById("cart__items").appendChild(card);
}

/**
 * Add card Object listener
 * @param {Object} card 
 */
function addItemCardListener(card) {
    card.querySelector(".deleteItem").addEventListener('click', onItemDeleteListener);
    card.querySelector("input").addEventListener('change', onItemCountListener);
}

//************************************* */

/**
 * Check customer form visibility
 * 
 * @param {Integer} count 
 */
function checkClientFormVisibility(count) {
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

/**
 * Handle the event of the "delete" button of the selected key
 * 
 * @param {Event} event 
 */
function onItemDeleteListener(event) {
    let itemId = getItemId(event);

    removeItem(itemId, event);   
    
    updateUI();

    checkClientFormVisibility(basePage.storage.productsCount);
}

/**
 * Remove selected item
 * 
 * @param {Integer} itemId 
 * @param {Event} event 
 */
function removeItem(itemId, event) {
    basePage.storage.removeProduct(itemId);

    removeCardUI(event.target.closest("#cart__item_" + itemId));      
}

/**
 * Remove element from "cart__items" node
 * @param {Object} card 
 */
function removeCardUI(card) {
    document.getElementById("cart__items").removeChild(card);
}

//************************************* */
/**
 * Handle Change Items object "quantity"
 * 
 * @param {Event} event 
 */
function onItemCountListener(event) {
    let itemId = getItemId(event);
    let quantity = event.target.value;

    // Check if valid quantity of product
    if (quantity >= 1 && quantity <= 100) {
        basePage.storage.updateProductQuantity(itemId, quantity);

        updateUI();
    }
    else {
        event.target.value = basePage.storage.clientCart[itemId].quantity;
        
        showFormMessage(event.target.id, 
            DialogMSG.FORM_PRODUCT_TITLE_INVALID_QUANTITY, 
            DialogMSG.FORM_PRODUCT_ALERT_QUANTITY);
    }
}

//************************************* */
/**
 * Return Object Item ID
 * @param {Event} event 
 * @returns 
 */
function getItemId(event) {
    let id = event.target.id;
    id = id.substring(id.length - 1);   

    return parseInt(id);
}

//************************************* */

/**
 * initializing order form
 */
function initOrderForm() {
    // Create formView Object
    let formView = document.querySelector("form");
    // Create fields texts order form Array
    let fieldsTextsOrderForm = Data.getFieldsTextsOrderForm(DialogMSG.getFormOrderErrorText());

    // Create FormOrderCart instance
    form = new FormOrderCart(formView, fieldsTextsOrderForm);

    addOrderFormListener(formView);
}

/**
 * add Order Form Listeners
 * 
 * @param {Object} formView 
 */
function addOrderFormListener(formView) { 
    // Add listener for "input" objects 
    formView.addEventListener("input", (event) => {    
        onFormFieldChange(event.target);
    });

    //Add listener for "submit" object
    formView.addEventListener("submit", (event) => { 
        // do not use the default action  
        event.preventDefault(); 

        onSubmit();
    });
}

/**
 * Handle fields change
 * 
 * @param {Object} target 
 */
function onFormFieldChange(target) {  
    // Check if valid field
    let isValidField = form.onFormFieldChange(target) ? true : false;

    // Create error message for current field
    let message = isValidField ? "" : form.getErrorMessage(target.id);

    // Change error message for current field
    form.setErrorFieldText(target, message);
}

//************************************* */

/**
 * Create Object order summary
 */
function onSubmit() {
    let products = basePage.storage.cartProductsData;
    let listIds = [];

    // Create list product Ids
    for(let product of products) {
        listIds.push(product._id);
    }

    // Create summuray Object
    let orderSummary = {};
    orderSummary.contact = form.getClientContactData();
    orderSummary.products = listIds;

    submitOrder(orderSummary);   
}

/**
 * Submit Order
 * 
 * @param {Object} orderSummary 
 */
async function submitOrder(orderSummary) {
    // Start Promise to submit order
    let result = await basePage.kanapAPI.submitOrder(orderSummary);

    // Check Promise response
    if (result.ok) {
        confirmOrder(result.result);
    }
    else {
        // Display the error message on UI dialog 
        basePage.showError(result.status, DialogMSG.MSG_ERROR_OCCURED);
    }    
}

/**
 * confirm order and change page location
 * @param {Object} result 
 */
function confirmOrder(result) {  
    // Clear client data in storage instance
    basePage.storage.clearClientCart();
    
    // Change page location to confirmation page
    document.location.href = "../html/confirmation.html?orderId=" + result.orderId;
}

//************************************* */

/**
 * Display the input error message on UI dialog 
 * 
 * @param {String} elementId 
 * @param {String} dialogTitle 
 * @param {String} dialogMessage 
 */
function showFormMessage(elementId, dialogTitle, dialogMessage) {
    // Show dialog message
    basePage.dialog.showMessage(dialogTitle, dialogMessage); 

    document.getElementById(elementId).focus();
}
