start();

function start() {
    console.log("*****************");
    console.log(storage.clientCart.length);
    console.log("*****************");

    checkUIVisibility(storage.clientCart.length);

    getProductData(storage.clientCart);
}

function getProductData(listData) { 
    if (listData.length > 0) {   
        let count = 0;     
        let productsData = []; 
        let urlProduct = "";

        for (let product of listData) {  
            urlProduct = `http://localhost:3000/api/products/${product._id}`;

            fetch(urlProduct)
            .then(data => {
                return data.json();
            })
            .then(jsonProduct => {                
                productsData.push(new Product(jsonProduct));
                count ++;

                if(count == listData.length) {                   
                    setupUI(productsData);
                }
            })
            .catch((error) => {
                showError(error);
            });            
        }        
    }
}

function setupUI(productsData) {
    updateProductsData(productsData);

    createCards();

    updateUI();
}

function showError(error) {
    alertDialog.showErrorCode("404", error);
}

function updateProductsData(productsData) {    
    storage.setCartProductsData(productsData);
}

function createCards() {
    for(let i = 0; i < storage.cartProductsData.length; i++) {
        let card = CardsView.getCartCard(storage.clientCart[i].num, 
                                            storage.cartProductsData[i], 
                                            storage.clientCart[i].quantity, 
                                            storage.clientCart[i].color);
    
        card.querySelector(".deleteItem").addEventListener('click', onItemDeleteListener);
        card.querySelector("input").addEventListener('change', onItemCountListener);

        document.getElementById("cart__items").appendChild(card);
    }
}

function updateUI() {
    document.getElementById("totalQuantity").innerText = storage.productsCount;
    document.getElementById("totalPrice").innerText = storage.totalPrice;

    updateCartCounter();
}

function checkUIVisibility(count) {
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

function onItemDeleteListener(event) {
    removeItem(getItemId(event), event);    
}

function removeItem(itemId, event) {
    storage.removeProduct(itemId);

    removeCardUI(event.target.closest("#cart__item_" + itemId));      

    updateUI();

    checkUIVisibility(storage.productsCount);
}

function onItemCountListener(event) {
    let itemId = getItemId(event);
    let quantity = event.target.value;

    if (quantity >= 1 && quantity <= 100) {
        storage.updateProductQuantity(itemId, quantity);

        updateUI();
    }
    else {
        showFormMessage(event.target.id, "* Veuillez sélectionner le nombre d'article(s) (1-100)");
    }
}

function showFormMessage(elementId, message) {
    alertDialog.showMessage("Quantité non valide", message); 
    document.getElementById(elementId).focus();
}

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

function removeCardUI(card) {
    document.getElementById("cart__items").removeChild(card);
}