class Storage {
    #mClientCart;
    #mCartProductsData;
    #mCurrentProductData;
    #mCurrentCartProduct;

    #mrootUrl = "http://localhost:3000/api/products/";

    constructor() {
        this.#mClientCart = localStorage.userCartShop != null ? JSON.parse(localStorage.userCartShop) : [];
        this.#mCartProductsData = [];
        this.#mCurrentProductData = {};
    }

    //************************************* */

    get clientCart() {
        return this.#mClientCart;
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

    get rootUrl() {
        return this.#mrootUrl;
    }

    get productsCount() {
        let total = 0;
        if (this.clientCart.length > 0) {
            for (let product of this.clientCart) {
                total += parseInt(product.quantity);
            }
        }
    
        return total;
    }

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
    
    #storeData() {
        localStorage.userCartShop = JSON.stringify(this.clientCart);
    }
    
    removeProduct(productId) {   
        let id = this.#getProductPosition(productId);

        this.clientCart.splice(id, 1);       

        this.cartProductsData.splice(id, 1);   

        this.#storeData();
    }

    updateProductQuantity(itemId, quantity) {
        let id = this.#getProductPosition(itemId);

        this.clientCart[id].quantity = quantity;       

        this.#storeData();
    }

    #getProductPosition(itemId) {
        return this.clientCart.findIndex((id) => id.num == itemId);
    }
}
