start();

function start() {
    getProductData();    
}

async function getProductData() {
    let product = [{"_id" : getProductId()}];

    let result = await kanapAPi.getListProductsData(product, "_id");

    if(kanapAPi.isValidResult(result)) {
        setupUI(result[0]);
    }
    else {
        hideUI();

        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
}

function getProductId() {
    return ULRTools.getHrefProperty("id");
}

function getURLProduct() {    
    return storage.rootUrl + getProductId();
}

function hideUI() {
    document.getElementById("title").innerText = DialogMSG.MSG_ERROR_NOT_FOUND;
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("colors").disabled = true;
    document.getElementById("quantity").disabled = true;
}

function setupUI(product) {
    storage.setCurrentProductData(product);

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

function enableButtonListener() {
    document.getElementById("addToCart").addEventListener("click", checkForm);
}

function checkForm() {
    if (isValidForm()) { 
        createCartProduct();
        
        addToCart();

        updateMenuCounterUI(); 

        showNewPurchase();

        resetForm();
    }
}

function isValidForm() {
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);    

    if (color == "") {    
        showMessage("colors", DialogMSG.FORM_ALERT_ARTICLE_COLOR);   

        return false;
    }
    else if (quantity <= 0 || quantity > 100) {     
        showMessage("quantity", DialogMSG.FORM_ALERT_ARTICLE_QUANTITY);

        return false;
    }

    return true;
}

function showMessage(elementId, message) {
    alertDialog.showMessage("Champ obligatoire", message); 
    document.getElementById(elementId).focus();
}

function createCartProduct() {
    storage.setCurrentCartProduct(
        new ProductCart(
            storage.clientCart.length,
            getProductId(),
            document.getElementById("colors").value,
            parseInt(document.getElementById("quantity").value)
        )
    );
}

function addToCart() {   
    storage.addProduct(storage.currentCartProduct);    
}

function showNewPurchase() {
    let message = DialogMSG.getPurchaseMessage(storage.currentProductData, storage.currentProductData.price);
    let title = storage.currentCartProduct.quantity > 1 ? DialogMSG.CART_ADD_PRODUCTS : DialogMSG.CART_ADD_PRODUCT;

    alertDialog.showMessage(title, message); 
}

function resetForm() {
    document.getElementById("colors").value = "";
    document.getElementById("quantity").value = 0;
}
    