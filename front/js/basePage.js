/**
 * class KanapBasePage 
 * 
 * Integrates all the data necessary for the proper functioning of the page:
 * - The dialog box
 * - The shopping cart product counter
 * - Backing up customer data
 * - The Kanap API to access data
 */
class KanapBasePage {
    /** @private @type{Dialog} */
    #mDialog;
    /** @private @type{Object} */
    #mCounter;
    /** @private @type{Object} */
    #mNavigationMenu;
    /** @private @type{Storage} */
    #mStorage;
    /** @private @type{KanapAPI} */
    #mKanapAPI;

    /** 
     * @return {#mDialog} Return instance
    */
    get dialog() {
        return this.#mDialog;
    }    
    /** 
     * @return {##mStorage} Return instance
    */
    get storage() {
        return this.#mStorage;
    }
    /** 
     * @return {#mKanapAPI} Return instance
    */
    get kanapAPI() {
        return this.#mKanapAPI;
    }
     
    /**
     * Initializing KanapBasePage instance
     * 
     * @param {String} rootApiUrl 
     */
    constructor(rootApiUrl) {
        this.#setup(rootApiUrl);

        this.#updateUI();
    }
    
    /**
     * Initializing data
     * 
     * @param {String} rootApiUrl 
     */
    #setup(rootApiUrl) {
        // Create Storage instance
        this.#mStorage = new Storage();
        // Create KanapAPI instance
        this.#mKanapAPI = new KanapAPI(rootApiUrl);        
        // Create Dialog instance
        this.#mDialog = new Dialog("body", "35rem", 3500);
        // Create Counter Object
        this.#mCounter = CartCounter.getCounter("counter");        
    }

    /**
     * Update client UI
     */
    #updateUI() {
        // Change navigation menu style
        this.#mNavigationMenu = document.querySelector("nav");
        this.#mNavigationMenu.style.alignItems = "center";

        this.updateCartCounterProduct();
    }
        
    /**
     * Update card counter product
     */
    updateCartCounterProduct() {
        // Get products cart count
        let count = this.storage.productsCount;
        // Update counter UI
        this.#mCounter.innerText = count;   
    
        this.#checkCounterVisibility(count);
    }

    /**
     * Check Counter Visibility
     * 
     * @param {Interger} count 
     */
    #checkCounterVisibility(count) {
        if(count > 0 ) {           
            if(document.getElementById("counter") == undefined) {
                this.#mNavigationMenu.appendChild(this.#mCounter);
            }        
        }
        else {
            if(document.getElementById("counter") != undefined) {
                this.#mNavigationMenu.removeChild(this.#mCounter);
            }  
        }
    }

    /**
     * Display the error message on UI dialog 
     * 
     * @param {String} status 
     * @param {String} message 
     */
    showError(status, message) {
        if(this != undefined) {
            this.dialog.showErrorCode("404", message);
        }
        
        console.log("********showError********");
        console.log(status);
    }
}