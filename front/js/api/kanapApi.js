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
        return new Promise(result => {
            fetch (this.rootUrl)
                .then (data => {
                    if(data.ok){
                        return data.json();
                    }
                    else{
                        result([{"ok": data.ok, "status": data.status, "statusText": data.statusText}]);
                    }   
                })
                .then (jsonListProduct => {
                    if (jsonListProduct != undefined && jsonListProduct.length > 0) {
                        result(jsonListProduct);
                    }
                    else {
                        result([{"ok": false, "status": 200, "statusText": "JSON Problem", "errorType": "JSON Problem"}]);
                    }
                    
                })
                .catch((error) => {
                    result([{"ok": false, "status": 200, "statusText": error, "errorType": error}]);
                });
        });
    }

    getListProductsData(listData, key) {   
        return new Promise(result => {
            if (listData.length > 0) {   
                let count = 0;     
                let productsData = []; 
                let urlProduct = "";
        
                for (let product of listData) {  
                    urlProduct = this.rootUrl + product[key];
        
                    fetch(urlProduct)
                    .then(data => {
                        if(data.ok){
                            return data.json();
                        }
                        else{
                            result([{"ok": data.ok, "status": data.status, "statusText": data.statusText, "errorType": "JSON Problem"}]);
                        }   
                    })
                    .then(jsonProduct => {     
                        let productData = new ProductData(jsonProduct);

                        if (productData[key] != undefined) {
                            productsData.push(new ProductData(jsonProduct));
                        }

                        count ++;

                        if(count == listData.length) {                
                            result(productsData);
                        }
                    })
                    .catch((error) => {
                        result([{"ok": false, "status": 200, "statusText": error, "errorType": error}]);
                    });            
                }        
            }
            else {
                result([]);
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

    submitOrder(summary) {
        return new Promise(result => {            
            fetch(this.rootUrl+"order",
                {
                    method: "POST",
                    headers:  {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(summary)
                })
            .then(
                data => {            
                    if(data.ok){
                        return data.json();
                    }
                    else{
                        result([{"ok": data.ok, "status": data.status, "statusText": data.statusText, "errorType": "JSON Problem"}]);
                    }                    
                }
            )
            .then(
                jsonData => {
                    result(jsonData);
                }
            )
            .catch((error) => {
                result([{"ok": false, "status": 200, "statusText": error, "errorType": error}]);
            });   
            
        })
    }
}