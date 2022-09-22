start();

function start() {
    checkFormUIVisibility(storage.clientCart.length);    

    getListProductsData();
}

async function getListProductsData() {
    let result = await kanapAPi.getListProductsData(storage.clientCart, "_id");

    if(result.length > 0 && result[0].errorType != undefined) {
        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
    else if(result.length > 0 && result[0]._id != undefined) {
        setupUI(result);
    }
}

function isValidResult(result) {
    if(result[0].errorType != undefined) {
        showError(result[0].errorType, DialogMSG.MSG_ERROR_OCCURED);
    }
    else if(result != undefined && result.length > 0 && result[0]._id != undefined) {
        setupUI(result);
    }
}

function setupUI(productsData) {
    updateCartProductsData(productsData);

    createCards();

    updateUI();
}

function updateCartProductsData(productsData) {    
    storage.setCartProductsData(productsData);
}

function createCards() {
    if (storage.cartProductsData != undefined && storage.cartProductsData.length > 0) {
        for(let i = 0; i < storage.cartProductsData.length; i++) {
            let card = CardsView.createCartCard(   
                        storage.clientCart[i].num, 
                        storage.cartProductsData[i], 
                        storage.clientCart[i].quantity, 
                        storage.clientCart[i].color);

            addItemCard(card);
        
            addItemCardListener(card);
        }
    }    
}

function addItemCard(card) {
    document.getElementById("cart__items").appendChild(card);
}

function addItemCardListener(card) {
    card.querySelector(".deleteItem").addEventListener('click', onItemDeleteListener);
    card.querySelector("input").addEventListener('change', onItemCountListener);
}

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

function onItemCountListener(event) {
    let itemId = getItemId(event);
    let quantity = event.target.value;

    if (quantity >= 1 && quantity <= 100) {
        storage.updateProductQuantity(itemId, quantity);

        updateUI();
    }
    else {
        showFormMessage(event.target.id, DialogMSG.FORM_ALERT_ARTICLE_QUANTITY);
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

