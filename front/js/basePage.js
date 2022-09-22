let alertDialog;
let counter;
let navigationMenu;
let storage;
let kanapAPi;

startPage();

function startPage() {
    createStorage();

    createKanapAPI();

    createCounter();
    
    createAlertDialog();
}

function createKanapAPI() {
    kanapAPi = new KanapAPI(storage.rootUrl);
}

function createStorage() {
    storage = new Storage();
}

function createAlertDialog() {
    alertDialog = new AlertDialog("body", "35rem", 3500);
}

function createCounter() {
    counter = ArticleCounter.getCounter("counter");

    navigationMenu = document.querySelector("nav");
    navigationMenu.style.alignItems = "center";

    updateMenuCounterUI();  
}

function updateMenuCounterUI() {
    let count = storage.productsCount;
    counter.innerText = count;   

    if(count > 0 ) {           
        if(document.getElementById("counter") == undefined) {
            navigationMenu.appendChild(counter);
        }        
    }
    else {
        if(document.getElementById("counter") != undefined) {
            navigationMenu.removeChild(counter);
        }  
    }
}

function showError(errorType, message) {
    alertDialog.showErrorCode("404", message);
    
    console.log("********basePage => showError");
    console.log(errorType);
    console.log("********basePage => showError");
}