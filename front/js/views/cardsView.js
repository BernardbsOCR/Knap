class CardsView {
    static getIndexCard(product) {
        let card = document.createElement("a");
        card.setAttribute("href", `./product.html?id=${product._id}`);
        let article = document.createElement("article");
        let image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        let name = document.createElement("h3");
        name.setAttribute("class", "productName");
        name.innerText = product.name;
        let description = document.createElement("p");
        description.setAttribute("class", "productDescription");
        description.innerText = product.description;
    
        card.appendChild(article);
        article.appendChild(image);
        article.appendChild(name);
        article.appendChild(description);
    
        return card;
    }
    
    static getProductCard(num, product, quantity, color) {
        let card = document.createElement("article");
        card.id = "cart__item_" + num; 
        card.setAttribute("class", "cart__item");
        card.setAttribute("data-id", product._id);
        card.setAttribute("data-color", product.color);
    
        let itemImage = document.createElement("div");
        itemImage.setAttribute("class", "cart__item__img");
        let image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);
        itemImage.appendChild(image);
    
        let itemContent = document.createElement("div")
        itemContent.setAttribute("class", "cart__item__content");
    
        let contentDescription = document.createElement("div");
        contentDescription.setAttribute("class", "cart__item__content__description");
        let name = document.createElement("h2");
        name.innerText = product.name;
        let productColor = document.createElement("p");
        productColor.innerText = color;
        let price = document.createElement("p");
        price.innerText = `${product.price} €`;
        contentDescription.appendChild(name);
        contentDescription.appendChild(productColor);
        contentDescription.appendChild(price);
    
        let contentSettings = document.createElement("div");
        contentSettings.setAttribute("class", "cart__item__content__settings");
    
        let settingQuantity = document.createElement("div");
        settingQuantity.setAttribute("class", "cart__item__content__settings__quantity");
        let titleQuantity = document.createElement("p");
        titleQuantity.innerText = "Qté : ";
        let itemQuantity = document.createElement("input");
        itemQuantity.id = "cart__item__quantity_" + num;
        itemQuantity.setAttribute("type", "number");
        itemQuantity.setAttribute("class", "itemQuantity");
        itemQuantity.setAttribute("name", "itemQuantity");
        itemQuantity.setAttribute("min", "1");
        itemQuantity.setAttribute("max", "100");
        itemQuantity.setAttribute("value", quantity);
        settingQuantity.appendChild(titleQuantity);
        settingQuantity.appendChild(itemQuantity);
    
        let settingDelete = document.createElement("div");
        settingDelete.setAttribute("class", "cart__item__content__settings__delete");
        let deleteItem = document.createElement("p");
        deleteItem.setAttribute("class", "deleteItem");
        deleteItem.innerText = "Supprimer";
        deleteItem.id = "cart__item__delete_" + num;
        settingDelete.appendChild(deleteItem);
    
        contentSettings.appendChild(settingQuantity);
        contentSettings.appendChild(settingDelete);  
        
        itemContent.appendChild(contentDescription);
        itemContent.appendChild(contentSettings);
    
        card.appendChild(itemImage);
        card.appendChild(itemContent);
    
        return card;
    }
}