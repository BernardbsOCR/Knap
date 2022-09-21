class DialogMSG {
    static MSG_ERROR_OCCURED = "Oops! Une erreur est survenue";
    static MSG_ERROR_NOT_FOUND = "Référence introuvable!";

    static FORM_ALERT_ARTICLE_QUANTITY = "* Veuillez sélectionner le nombre d'article(s) (1-100)";
    static FORM_ALERT_ARTICLE_COLOR = "* Veuillez choisir une couleur";

    static CART_ADD_PRODUCT = "Article ajouté au panier :";
    static CART_ADD_PRODUCTS = "Articles ajoutés au panier :";

    static getPurchaseMessage(product, price) {
        let message = "- <b>Nom du produit :</b>  " + product.name;
        message += "<br/><br/>- <b>Couleur :</b>  " + product.color;
        message += "<br/><br/>- <b>Quantité :</b>  " + product.quantity;
        message += "<br/><br/>- <b>Prix :</b>  " + price * product.quantity + " €";

        return message;
    }
}