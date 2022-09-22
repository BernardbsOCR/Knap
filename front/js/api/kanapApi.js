class KanapAPI {
    #mRootUrl;
    
    constructor(url) {
        this.#mRootUrl = url;
    }

    //************************************* */

    get rootUrl() {
        return this.#mRootUrl;
    }

    //************************************* */

    getListProducts() {
        return new Promise(data => {
            fetch (this.rootUrl)
                .then (data => {
                    return data.json();
                })
                .then (jsonListProduct => {
                    if (jsonListProduct != undefined && jsonListProduct.length > 0) {
                        data(jsonListProduct);
                    }
                    else {
                        data([{"errorType": "not found"}]);
                    }
                    
                })
                .catch((error) => {
                    data([{"errorType": error}]);
                });
        });
    }

    getListProductsData(listData, key) {   
        return new Promise(data => {
            if (listData.length > 0) {   
                let count = 0;     
                let productsData = []; 
                let urlProduct = "";
        
                for (let product of listData) {  
                    urlProduct = this.rootUrl + product[key];
        
                    fetch(urlProduct)
                    .then(data => {
                        return data.json();
                    })
                    .then(jsonProduct => {     
                        let productData = new ProductData(jsonProduct);

                        if (productData[key] != undefined) {
                            productsData.push(new ProductData(jsonProduct));
                        }

                        count ++;

                        if(count == listData.length) {                
                            data(productsData);
                        }
                    })
                    .catch((error) => {
                        data([{"errorType": error}]);
                    });            
                }        
            }
            else {
                data([]);
            }        
            
        });
    }

    isValidResult(result) {
        if(result.length > 0 && result[0].errorType != undefined) {
            return false;
        }
        else if(result != undefined && result.length > 0 && result[0]._id != undefined) {
            return true;
        }
    }
}