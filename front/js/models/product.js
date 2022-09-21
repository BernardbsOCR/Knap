/**
 * Class Product 
 */

class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);        
    }
}

class ProductCart {
    constructor(num, productId, color, quantity) {
        this.num = num;
        this._id = productId;
        this.color = color;
        this.quantity = quantity;
    }
}

