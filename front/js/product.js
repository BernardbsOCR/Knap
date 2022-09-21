start();

function start() {
    getProductData();    
}

async function getProductData() {
    let product = [{"_id" : getProductId()}];

    let result = await kanapAPi.getListProductsData(product, "_id");

    if(result == undefined || result[0].errorType != undefined) {
        hideUI();

        showError(result[0].errorType, "Oops! Une erreur est survenue");
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        onProductDataLoaded(result[0]);
    }
}

function getProductId() {
    return ULRTools.getHrefProperty("id");
}

function getURLProduct() {    
    return storage.rootUrl + getProductId();
}

function hideUI() {
    document.getElementById("title").innerText = "Référence introuvable!"
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("colors").disabled = true;
    document.getElementById("quantity").disabled = true;
}

function onProductDataLoaded(product) {
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
    }
}

function isValidForm() {
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);    

    if (color == "") {    
        showMessage("colors", "* Veuillez choisir une couleur");   

        return false;
    }
    else if (quantity <= 0 || quantity > 100) {     
        showMessage("quantity", "* Veuillez sélectionner le nombre d'article(s) (1-100)");

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
    let message = "- <b>Nom du produit :</b>  " + storage.currentProductData.name;
    message += "<br/><br/>- <b>Couleur :</b>  " + storage.currentCartProduct.color;
    message += "<br/><br/>- <b>Quantité :</b>  " + storage.currentCartProduct.quantity;
    message += "<br/><br/>- <b>Prix :</b>  " + storage.currentProductData.price * storage.currentCartProduct.quantity + " €";

    let title = storage.currentCartProduct.quantity > 1 ? "Articles ajoutés au panier :" : "Article ajouté au panier :";

    alertDialog.showMessage(title, message); 
}


    