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
        console.log("getListProducts");
        return new Promise(response => {
            fetch (this.rootUrl)
                .then (result => {
                    if(result.ok){
                        return result.json();
                    }
                    else{
                        response(result);
                    }   
                })
                .then (data => {
                    response({"ok": true, "status": 200, "statusText": "success", "result": data});                    
                })
                .catch((error) => {
                    response({"ok": false, "status": 400, "statusText": error, "result": {}});
                });
        });
    }

    getListProductsData(listItems, key) {   
        return new Promise(response => {
            if (listItems.length > 0) {   
                let count = 0;     
                let data = []; 
        
                for (let item of listItems) {  
                    let url = this.rootUrl + item[key];
        
                    fetch(url)
                    .then(result => {


                        if(result.ok){
                            return result.json();
                        }
                        else{
                            response(result);
                        }   
                    })
                    .then(json => {   
                        data.push(new ProductData(json));

                        count ++;

                        if(count == listItems.length) { 
                            response({"ok": true, "status": 200, "statusText": "success", "result": data});   
                        }
                    })
                    .catch((error) => {
                        response({"ok": false, "status": 200, "statusText": error, "result": {}});
                    });            
                }        
            }
            else {
                response({"ok": true, "status": 200, "statusText": "success", "result": []});   
            }        
            
        });
    }

    isValidResult(response) {
        if(response.length > 0 && response[0].errorType != undefined) {
            return false;
        }
        else if(response != undefined && response.length > 0 && response[0]._id != undefined) {
            return true;
        }
    }

    submitOrder(summary) {
        return new Promise(response => {            
            fetch(this.rootUrl+"order",
                {
                    method: "POST",
                    headers:  {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(summary)
                })
            .then(
                result => {            
                    if(result.ok){
                        return result.json();
                    }
                    else{
                        response({"ok": result.ok, "status": result.status, "statusText": result.statusText});
                    }                    
                }
            )
            .then(
                json => {
                    response({"ok": true, "status": 200, "statusText": "success", "result": json}); 
                }
            )
            .catch((error) => {
                response({"ok": false, "status": 200, "statusText": error, "result": {}});
            });   
            
        })
    }
}