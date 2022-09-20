const currentUrl = document.location.href;
const url = new URL(currentUrl);
const productId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;
let newProduct;

start();

function start() {
    getProductData();

    enableButtonListener();
}

function getProductData() {
    fetch(urlProduct)
    .then(data => {
        return data.json();
    })
    .then(jsonProduct => {  
        let product = new Product(jsonProduct);

        if (product._id != undefined) {  
            updateCurrentProductData(product);
            updateUI();            
        }    
        else {     
            showError();
        }          
    })
    .catch((error) => {
        showError();
    });
}

function showError() {
    hideProduct();

    alertDialog.showErrorCode("404", "Oops! Une erreur est survenue");
}

function hideProduct() {
    document.getElementById("title").innerText = "Référence introuvable!"
    document.getElementById("addToCart").style.display = "none";
    document.getElementById("colors").disabled = true;
    document.getElementById("quantity").disabled = true;
}

function updateCurrentProductData(product) {
    storage.setCurrentProductData(product);
}

function updateUI() { 
    let image = document.createElement("img");
    image.setAttribute("src", storage.currentProductData.imageUrl);
    image.setAttribute("alt", storage.currentProductData.altTxt);

    document.querySelector(".item__img").appendChild(image);
    document.getElementById("title").innerText = storage.currentProductData.name;
    document.getElementById("price").innerText = storage.currentProductData.price;
    document.getElementById("description").innerText = storage.currentProductData.description;

    for (let color of storage.currentProductData.colors) {
        document.getElementById("colors").appendChild(getColorOption(color));
    }       
}

function getColorOption(color) {
    let option = document.createElement("option");
    option.setAttribute("value", color);
    option.innerText = color;

    return option;
}

function enableButtonListener() {
    document.getElementById("addToCart").addEventListener("click", checkProduct);
}

function checkProduct() {
    if (isValidForm()) {        
        addToCart();

        updateCartCounter(); 

        showNewPurchase();
    }
}

function isValidForm() {
    let color = document.getElementById("colors").value;
    let quantity = parseInt(document.getElementById("quantity").value);    

    if (color == "") {    
        showFormMessage("colors", "* Veuillez choisir une couleur");   

        return false;
    }
    else if (quantity <= 0 || quantity > 100) {     
        showFormMessage("quantity", "* Veuillez sélectionner le nombre d'article(s) (1-100)");

        return false;
    }

    return true;
}

function showFormMessage(elementId, message) {
    alertDialog.showMessage("Champ obligatoire", message); 
    document.getElementById(elementId).focus();
}

function addToCart() {
    newProduct = {};
    newProduct.num = storage.clientCart.length;
    newProduct._id = productId;
    newProduct.color = document.getElementById("colors").value;
    newProduct.quantity = parseInt(document.getElementById("quantity").value);

    storage.addProduct(newProduct);    
}

function showNewPurchase() {
    let message = "- <b>Nom du produit :</b>  " + storage.currentProductData.name;
    message += "<br/><br/>- <b>Couleur :</b>  " + newProduct.color;
    message += "<br/><br/>- <b>Quantité :</b>  " + newProduct.quantity;
    message += "<br/><br/>- <b>Prix :</b>  " + storage.currentProductData.price * newProduct.quantity + " €";

    let title = newProduct.quantity > 1 ? "Articles ajoutés au panier :" : "Article ajouté au panier :";

    alertDialog.showMessage(title, message); 
}


    