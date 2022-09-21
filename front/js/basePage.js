let alertDialog;
let counter;
let navigationMenu;
let storage;

startPage();

function startPage() {
    createStorage();

    createCounter();
    
    createAlertDialog();
}

function createStorage() {
    storage = new Storage();
}

function createAlertDialog() {
    alertDialog = new AlertDialog("body", "35rem", 3000);
}

function createCounter() {
    counter = ArticleCounter.getCounter("counter");

    navigationMenu = document.querySelector("nav");
    navigationMenu.style.alignItems = "center";

    updateCartCounter();  
}

function updateCartCounter() {
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