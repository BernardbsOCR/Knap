class Storage {
    #mClientCart;
    #mCartProductsData;
    #mCurrentProductData;
    #mCurrentCartProduct;

    constructor() {
        console.log("localStorage.userCartShop");
        console.log(localStorage.userCartShop);

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

    clearClientCart() {
        this.#mClientCart = [];
        this.#mCartProductsData = [];
        this.#mCurrentProductData = [];
        this.#mCurrentCartProduct = [];

        localStorage.userCartShop = [];
    }
}
