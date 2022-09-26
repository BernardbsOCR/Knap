//************************************* */

/**
 * Create a promise to add a "script" element in the document body
 * 
 * @param {String} file Source of the file to load
 * @returns {Promise} The Promise's response
 */
function addJSScript(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = (data) => {response({"ok": true, "status": 200, "statusText": "success"});}
        scriptEle.onerror = (error) => {response({"ok": false, "status": 400, "statusText": "File not found"});}

        document.body.appendChild(scriptEle);
    });
}

/**
 * Chain of Promise {addJSScript}
 */
Promise.all([
    addJSScript("../js/models/products.js"),
    addJSScript("../js/tools/data.js"),
    addJSScript("../js/text/dialog_fr.js"),
    addJSScript("../js/api/kanapApi.js"),
    addJSScript("../js/views/alertDialogView.js"),
    addJSScript("../js/views/CounterView.js"),
    addJSScript("../js/views/cardsView.js"),
    addJSScript("../js/tools/storage.js"),
    addJSScript("../js/basePage.js")
])
.then(() => {
    start();
})
.catch((error) => {
    console.log("********addJSScript********");
    console.log(error);
});

//************************************* */

//** @type {BasePage} */
let basePage;

/**
 * Start JS code
 */
function start() {
    initBasePage();

    getListProducts();
}

/**
 * Create instance of {basePage}
 */
function initBasePage() {
    // Create instance of KanapBasePage
    basePage = new KanapBasePage(Data.rootApiUrl);
}

/**
 * Retrieve product list 
 * @async
 */
async function getListProducts() {   
    // Start Promise to get list of products 
    let result = await basePage.kanapAPI.getListProducts();

    // Check Promise response
    if(result.ok) {
        updateUI(result.result);
    }
    else{
        // Display the error message on UI dialog 
        basePage.showError(result.statusText, DialogMSG.MSG_ERROR_OCCURED);
    }
}

//************************************* */

/**
 * Update user interface
 * 
 * @param {array.<ProductData>} listProduct 
 */
function updateUI(listProduct){
    for(let product of listProduct){
        // Create new card items "a" element
        let card = CardsView.createIndexCard(new ProductData(product));
        
        // Add card element to "items" node
        document.getElementById("items").appendChild(card);    
    }
}