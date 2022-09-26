/**
 * Class ProductData 
 * - Object contain all product data
 */
class ProductData {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);        
    }
}

//************************************* */
/**
 * Class ProductCardCart 
 * - Object contain all product data for order cart
 */
class ProductCardCart {
    constructor(num, productId, color, quantity) {
        this.num = num;
        this._id = productId;
        this.color = color;
        this.quantity = quantity;
    }
}

