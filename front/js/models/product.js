/**
 * Class Product 
 */

class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);        
    }
}