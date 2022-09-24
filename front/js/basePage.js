class KanapBasePage {
    #mAlertDialog;
    #mCounter;
    #mNavigationMenu;
    #mStorage;
    #mKanapAPI;

    get alertDialog() {
        return this.#mAlertDialog;
    }

    get counter() {
        return this.#mCounter;
    }

    get navigationMenu() {
        return this.#mNavigationMenu;
    }

    get storage() {
        return this.#mStorage;
    }

    get kanapAPI() {
        return this.#mKanapAPI;
    }
    
    constructor(rootApiUrl) {
        this.#setup(rootApiUrl);

        this.updateMenuCounterUI();
    }
    
    #setup(rootApiUrl) {
        this.#mStorage = new Storage();
    
        this.#mKanapAPI = new KanapAPI(rootApiUrl);        
        
        this.#mAlertDialog = new AlertDialog("body", "35rem", 3500);

        this.#mCounter = CartCounter.getCounter("counter");
    
        this.#mNavigationMenu = document.querySelector("nav");
        this.#mNavigationMenu.style.alignItems = "center";
    }
        
    updateMenuCounterUI() {
        let count = this.storage.productsCount;
        this.counter.innerText = count;   
    
        if(count > 0 ) {           
            if(document.getElementById("counter") == undefined) {
                this.navigationMenu.appendChild(this.counter);
            }        
        }
        else {
            if(document.getElementById("counter") != undefined) {
                this.navigationMenu.removeChild(this.counter);
            }  
        }
    }

    showError(status, message) {
        if(basePage != undefined) {
            basePage.alertDialog.showErrorCode("404", message);
        }
        
        console.log("********showError********");
        console.log(status);
    }
}