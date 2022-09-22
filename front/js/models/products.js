/**
 * Class Product 
 */

class ProductData {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);        
    }
}

class ProductCardCart {
    constructor(num, productId, color, quantity) {
        this.num = num;
        this._id = productId;
        this.color = color;
        this.quantity = quantity;
    }
}

