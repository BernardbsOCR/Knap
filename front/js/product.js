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
        scriptEle.onload = () => {response({"ok": true, "status": 200, "statusText": "File Loaded"});}
        scriptEle.onerror = (e) => {response({"ok": false, "status": 400, "statusText": "File not found"});}

        document.body.appendChild(scriptEle);
    });
}

/**
 * Chain of Promise {addJSScript}
 */
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

//** @type {BasePage} */
let basePage;

/**
 * Start JS code
 */
function start() {
    initPage();

    getProductData();    
}

/**
 * Create instance of {basePage}
 */
function initPage() {
    basePage = new KanapBasePage(Data.rootApiUrl);
}

/**
 * Create products data list and update UI
 * @async
 */
async function getProductData() {
    // Retrieve product ID
    let id = Data.getHrefPropertyValue("id");
    // Create product element 
    let product = [{"_id" : id}];
    // Start Promise to get product data
    let result = await basePage.kanapAPI.getListProductsData(product, "_id");

    // Check Promise response
    if(result.ok) {
        updateUI(result.result[0]);
    }
    else {
        hideUI();
        // Display the error message on UI dialog 
        basePage.showError(result.status, DialogMSG.MSG_ERROR_OCCURED);
    }     
}

//************************************* */

/**
 * Update user interface
 * 
 * @param {ProductData} product 
 */
function updateUI(product) {    
    saveCurrentProductData(product);

    updateUIProduct();  

    enableAddToCartListener();
}

/**
 * Save current product data on {storage} instance
 * 
 * @param {ProductData} product 
 */
function saveCurrentProductData(product) {    
    basePage.storage.currentProductData = product;
}

/**
 * Update UI product
 */
function updateUIProduct() {     
    document.getElementById("title").innerText = basePage.storage.currentProductData.name;
    document.getElementById("price").innerText = basePage.storage.currentProductData.price;
    document.getElementById("description").innerText = basePage.storage.currentProductData.description;
    
    // Create new element {"img"}
    let image = CardsView.createProductImage(basePage.storage.currentProductData.imageUrl, 
        basePage.storage.currentProductData.altTxt);

    document.querySelector(".item__img").appendChild(image);

    // Create array of available colors and add on UI
    for (let color of basePage.storage.currentProductData.colors) {
        // Create new element {"option"}
        let option = CardsView.createProductColorOption(color);        
        document.getElementById("colors").appendChild(option);
    }       
}

/**
 * Hide product of UI
 */
function hideUI() {
    document.getElementById("title").innerText = DialogMSG.MSG_ERROR_NOT_FOUND;
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("colors").disabled = true;
    document.getElementById("quantity").disabled = true;
}

/**
 * Initializing "colors" and "quantity" value of UI
 */
function resetFormUI() {
    document.getElementById("colors").value = "";
    document.getElementById("quantity").value = 0;
}

//************************************* */

/**
 * enable "addToCart" button Listener
 */
function enableAddToCartListener() {
    document.getElementById("addToCart").addEventListener("click", onAddToCart);
}

function onAddToCart() {
    // Check if validform
    if (isValidForm()) {         
        addCurrentProduct();

        showDialogPurchase();

        resetFormUI();
        // Update "MenuCounter" element of UI
        basePage.updateCartCounterProduct(); 
    }
}

/**
 * Add current product to cart
 */
function addCurrentProduct() {
    // Retrieve product ID
    let id = Data.getHrefPropertyValue("id");
    // Get product color
    let color = document.getElementById("colors").value;
    // Get product quantity and Convert {String} value to {Integer}
    let quantity = parseInt(document.getElementById("quantity").value);

    // Add current poduct to cart in {storage} instance
    basePage.storage.addCurrentProduct(id, color, quantity);    
}

/**
 * Check if the form is valid 
 * 
 * @returns {boolean} 
 */
function isValidForm() {
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);    

    if (color == "") {    
        // Display the error message on UI dialog 
        showMessage("colors", DialogMSG.FORM_PRODUCT_ALERT_COLOR);   

        return false;
    }
    else if (quantity < 1 || quantity > 100) {     
        // Display the error message on UI dialog 
        document.getElementById("quantity").value = 0;

        showMessage("quantity", DialogMSG.FORM_PRODUCT_ALERT_QUANTITY);

        return false;
    }

    return true;
}

//************************************* */

/**
 * Display the error message on UI dialog 
 * 
 * @param {String} elementId
 * @param {String} DialogMessage 
 */
function showMessage(elementId, DialogMessage) {
    basePage.dialog.showMessage(DialogMSG.FORM_PRODUCT_TITLE_REQUIRED_FIELD, DialogMessage);

    document.getElementById(elementId).focus();
}

/**
 * Shows a summary of the added product on dialog
 */
function showDialogPurchase() {
    let message = DialogMSG.getPurchaseMessage(basePage.storage.currentCartProduct, basePage.storage.currentProductData);
    let title = DialogMSG.getPurchaseTitle(basePage.storage.currentCartProduct);

    basePage.dialog.showMessage(title, message); 
}


    