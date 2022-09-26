/**
 * Class Storage
 * 
 * Integrates all user save data
 * - the shopping cart
 * - Cart product data
 * - Current product data
 * - Current cart product
 */

class Storage {
    /** @private @type{Array.<ProductData>} mClientCart */
    #mClientCart;
    /** @private @type{Array.<ProductCardCart>} mClientCart */
    #mCartProductsData;
    /** @private @type{ProductData} mClientCart */
    #mCurrentProductData;
    /** @private @type{Array.<ProductCardCart>} mClientCart */
    #mCurrentCartProduct;

    /**
     * @constructor Initializing Storage instance
     */
    constructor() {
        // Check localStorage.userCartShop variable is define
        this.#mClientCart = localStorage.userCartShop != undefined && localStorage.userCartShop != []? JSON.parse(localStorage.userCartShop) : [];
        this.#mCartProductsData = [];
        this.#mCurrentProductData = {};
    }

    //************************************* */

    get clientCart() {
        return this.#mClientCart;
    }

    set clientCart(value) {
        this.#mClientCart = value;
    }

    get cartProductsData() {
        return this.#mCartProductsData;
    }   

    set cartProductsData(data) {
        this.#mCartProductsData = data;
    }

    get currentProductData() {
        return this.#mCurrentProductData;
    }

    set currentProductData(productData) {
        this.#mCurrentProductData = productData;
    }

    get currentCartProduct() {
        return this.#mCurrentCartProduct;
    }
    
    set currentCartProduct(product) {
        this.#mCurrentCartProduct = product;
    }

    /**
     * Get clientCart number of products 
     * @returns 
     */
    get productsCount() {
        let total = 0;

        if (this.clientCart.length > 0) {
            for (let product of this.clientCart) {
                total += parseInt(product.quantity);
            }
        }
    
        return total;
    }

    /**
     * Get total price for all products in clientCart
     * @returns 
     */
    get totalPrice() {
        let totalPrice = 0;

        if (this.cartProductsData.length > 0) {
            for (let i = 0; i < this.cartProductsData.length; i++) {
                totalPrice += parseInt(this.cartProductsData[i].price) * parseInt(this.clientCart[i].quantity);
            }
        }  

        return totalPrice;
    }

    //************************************* */
    
    /**
     * Add Current Product in clientCart
     * 
     * @param {String} productId 
     * @param {String} color 
     * @param {Integer} quantity 
     */
    addCurrentProduct(productId, color, quantity) {
        let card = new ProductCardCart(
                    this.clientCart.length,
                    productId,
                    color,
                    quantity);        
        
        this.currentCartProduct = card;

        let id = this.#isAlreadyAdded();
        
        if (id != -1) {
            this.clientCart[id].quantity += this.currentCartProduct.quantity;
        }
        else {
            this.clientCart.push(this.currentCartProduct);
        }       

        this.#storeData();  
    }
    
    /**
     * Check if product presnet in clientCart
     * 
     * @returns 
     */
    #isAlreadyAdded() {
        if (this.clientCart.length > 0) {
            let count = 0;
            for (let product of this.clientCart) {
                if (product._id == this.currentCartProduct._id && product.color == this.currentCartProduct.color) {
                    return count;
                }
                count++;
            }
        }    
    
        return -1;
    }
    
    /**
     * Save clientCart in localStorage.userCartShop
     */
    #storeData() {
        localStorage.userCartShop = JSON.stringify(this.clientCart);
    }
    
    /**
     * Remove product of clientCart & cartProductsData lists
     * 
     * @param {String} productId 
     */
    removeProduct(productId) {   
        let id = this.#getProductPosition(productId);

        this.clientCart.splice(id, 1);       

        this.cartProductsData.splice(id, 1);   

        this.#storeData();
    }

    /**
     * Update clientCart product quantity
     * 
     * @param {String} itemId 
     * @param {Integer} quantity 
     */
    updateProductQuantity(itemId, quantity) {
        let id = this.#getProductPosition(itemId);

        this.clientCart[id].quantity = quantity;       

        this.#storeData();
    }

    /**
     * Get product data in clientCart
     * 
     * @param {String} itemId 
     * @returns 
     */
    #getProductPosition(itemId) {
        return this.clientCart.findIndex((id) => id.num == itemId);
    }

    /**
     * get order summary list
     * @returns 
     */
    getOrderSummaryList() {    
        let productSummary = [];
    
        for(let i = 0; i < this.clientCart.length; i++) {
            let product = {};
            product.id = this.clientCart[i]._id;
            let id = this.cartProductsData.findIndex(e => e._id == product.id);        
            product.name = this.cartProductsData[id].name;
            product.color = this.clientCart[i].color;
            product.quantity = this.clientCart[i].quantity;
            product.price = this.cartProductsData[id].price;
            product.total = parseInt(product.quantity) * parseInt(product.price);
    
            productSummary.push(product);
        }

        return productSummary;
    }

    /**
     * clear all data & localStorage.userCartShop
     */
    clearClientCart() {
        this.#mClientCart = [];
        this.#mCartProductsData = [];
        this.#mCurrentProductData = [];
        this.#mCurrentCartProduct = [];

        localStorage.userCartShop = [];
    }
}
