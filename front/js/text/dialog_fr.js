class DialogMSG {
    static MSG_ERROR_OCCURED = "Oops! Une erreur est survenue";
    static MSG_ERROR_NOT_FOUND = "Référence introuvable!";

    static FORM_PRODUCT_TITLE_REQUIRED_FIELD = "Champ obligatoire";
    static FORM_PRODUCT_TITLE_INVALID_QUANTITY = "Quantité non valide";
    static FORM_PRODUCT_ALERT_QUANTITY = "* Veuillez sélectionner le nombre d'article(s) (1-100)";    
    static FORM_PRODUCT_ALERT_COLOR = "* Veuillez choisir une couleur";
    static FORM_PRODUCT_ADDED_PRODUCT = "Article ajouté au panier :";
    static FORM_PRODUCT_ADDED_PRODUCTS = "Articles ajoutés au panier :";

    static FORM_ORDER_ERROR_REQUIRED = "Champ obligatoire";
    static FORM_ORDER_ERROR_FIRST_NAME = "Caractères autorisés : Lettres, chiffres et caractères spéciaux ('.', '-', '_'), 30 caractères maximum";
    static FORM_ORDER_ERROR_LAST_NAME = "Caractères autorisés : Lettres, chiffres et caractères spéciaux ('.', '-', '_'), 30 caractères maximum";
    static FORM_ORDER_ERROR_ADDRESS = "Caractères autorisés : Lettres, chiffres et caractères spéciaux ('.', '-', '_'), 100 caractères maximum";
    static FORM_ORDER_ERROR_CITY = "Caractères autorisés : Lettres, chiffres et caractères spéciaux ('.', '-', '_'), 50 caractères maximum";
    static FORM_ORDER_ERROR_EMAIL = "Veuillez saisir une adresse email valide";
    
    static getFormOrderErrorText() {
        let errors = [this.FORM_ORDER_ERROR_FIRST_NAME, 
            this.FORM_ORDER_ERROR_LAST_NAME,
            this.FORM_ORDER_ERROR_ADDRESS,
            this.FORM_ORDER_ERROR_CITY,
            this.FORM_ORDER_ERROR_EMAIL];
        return errors;
    }

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