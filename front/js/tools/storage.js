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

    get clientCart() {
        return this.#mClientCart;
    }

    get cartProductsData() {
        return this.#mCartProductsData;
    }   

    setCartProductsData(data) {
        this.#mCartProductsData = data;
    }

    get currentProductData() {
        return this.#mCurrentProductData;
    }

    setCurrentProductData(productData) {
        this.#mCurrentProductData = productData;
    }

    get currentCartProduct() {
        return this.#mCurrentCartProduct;
    }
    
    setCurrentCartProduct(product) {
        this.#mCurrentCartProduct = product;
    }

    get rootUrl() {
        return this.#mrootUrl;
    }

    get productsCount() {
        let total = 0;
        if(this.clientCart.length > 0) {
            for(let product of this.clientCart) {
                total += parseInt(product.quantity);
            }
        }
    
        return total;
    }

    get totalPrice() {
        let totalPrice = 0;

        if(this.cartProductsData.length > 0) {
            for(let i = 0; i < this.cartProductsData.length; i++) {
                totalPrice += parseInt(this.cartProductsData[i].price) * parseInt(this.clientCart[i].quantity);
            }
        }  

        return totalPrice;
    }
    
    addProduct(product) {
        if (product != undefined) {
            let id = this.#isAlreadyAdded(product, this.clientCart);
            
            if(id != -1) {
                this.clientCart[id].quantity += product.quantity;
            }
            else {
                this.clientCart.push(product);
            }       
    
            this.#storeData();
        }    
    }
    
    #isAlreadyAdded(newProduct) {
        if (this.clientCart.length > 0) {
            let count = 0;
            for (let product of this.clientCart) {
                if (product._id == newProduct._id && product.color == newProduct.color) {
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
        let id = this.#getProductId(productId);

        this.clientCart.splice(id, 1);       

        this.cartProductsData.splice(id, 1);   

        this.#storeData();
    }

    updateProductQuantity(productId, quantity) {
        let id = this.#getProductId(productId);

        this.clientCart[id].quantity = quantity;       

        this.cartProductsData[id].quantity = quantity;

        this.#storeData();
    }

    #getProductId(productId) {
        return this.clientCart.findIndex((id) => id.num == productId);
    }
}
