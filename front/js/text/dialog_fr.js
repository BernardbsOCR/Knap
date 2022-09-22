class DialogMSG {
    static MSG_ERROR_OCCURED = "Oops! Une erreur est survenue";
    static MSG_ERROR_NOT_FOUND = "Référence introuvable!";

    static FORM_PRODUCT_TITLE_REQUIRED_FIELD = "Champ obligatoire";
    static FORM_PRODUCT_TITLE_INVALID_QUANTITY = "Quantité non valide";
    static FORM_PRODUCT_ALERT_QUANTITY = "* Veuillez sélectionner le nombre d'article(s) (1-100)";    
    static FORM_PRODUCT_ALERT_COLOR = "* Veuillez choisir une couleur";
    static FORM_PRODUCT_ADDED_PRODUCT = "Article ajouté au panier :";
    static FORM_PRODUCT_ADDED_PRODUCTS = "Articles ajoutés au panier :";
    

    static getPurchaseMessage(currentCartProduct, currentProductData) {
        let message = "- <b>Nom du produit :</b>  " + currentProductData.name;
        message += "<br/><br/>- <b>Couleur :</b>  " + currentCartProduct.color;
        message += "<br/><br/>- <b>Quantité :</b>  " + currentCartProduct.quantity;
        message += "<br/><br/>- <b>Prix :</b>  " + currentProductData.price * currentCartProduct.quantity + " €";

        return message;
    }

    static getPurchaseTitle(currentCartProduct) {
        return currentCartProduct.quantity > 1 ? this.FORM_PRODUCT_ADDED_PRODUCTS : this.FORM_PRODUCT_ADDED_PRODUCT;
    }
}