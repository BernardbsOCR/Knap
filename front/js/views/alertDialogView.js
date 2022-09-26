/**
* Class Dialog
* 
* Create dialog Object
*/

class Dialog {
    /**@type{Object} dialog*/
    dialog;
    /**@type{Object} alertTitle*/
    alertTitle;
    /**@type{Object} alertDescription*/
    alertDescription;
    /**@typedef{timeOut} alertTimer*/
    alertTimer;

    /**
     * @constructor Initialiszing instance of Dialog class
     * 
     * @param {String} parentElement 
     * @param {Integer} width 
     * @param {Integer} time 
     */
    constructor(parentElement, width, time) {
        this.parentElement = parentElement;
        this.width = width;
        this.time = time;

        this.#setupUI();
    }

    //************************************* */

    /**
     * Initializing Dialog data
     */
    #setupUI() {
        this.dialog = this.#getDialog(this.width);
        this.alertTitle = this.#getDialogTitle();  
        this.alertDescription = this.#getDialogDescription();

        this.dialog.appendChild(this.alertTitle);
        this.dialog.appendChild(this.alertDescription);
    }

    /**
     * Create Dialog object
     * 
     * @param {Integer} width 
     * @returns 
     */
    #getDialog(width) {
        let dialog = document.createElement("div");
        dialog.id = "alert-dialog";
        dialog.style.width = width;
        dialog.style.maxWidth = "80%";
        dialog.style.height = "fit-content";
        dialog.style.position = "fixed";
        dialog.style.left = "50%";
        dialog.style.top = "25%";
        dialog.style.padding = "1.5rem";
        dialog.style.background = "white";
        dialog.style.boxShadow = "0 .3rem 1rem #000000";
        dialog.style.borderRadius = "0.5rem";
    
        return dialog;
    }

    /**
     * Create Dialog Title Object
     * 
     * @returns 
     */
    #getDialogTitle() {
        let title = document.createElement("h2");
        title.style.width = "auto";
        title.style.height = "fit-content";
        title.style.color = "black";
        title.style.margin = "1rem";
        title.style.marginBottom = "2rem";
        title.style.paddingBottom = "0.5rem";
        title.style.textAlign = "center";
        title.style.borderBottom = ".2px solid black";
        
        return title;
    }

    /**
     * Create Dialog Description Object
     * @returns 
     */

    #getDialogDescription() {
        let description = document.createElement("p");
        description.style.width = "100%";
        description.style.height = "fit-content";
        description.style.margin = "1rem";
        description.style.textAlign = "center";
        description.style.color = "black";

        return description;
    } 
    
    /**
     * Show Dialog Error Object
     * 
     * @param {String} errorTitle 
     * @param {String} description 
     */
    showErrorCode(errorTitle, description) {
        this.alertTitle.innerText = errorTitle; 
        this.alertDescription.innerText = description;       
        
        this.#updateErrorCodeSetup();   

        this.#showDialog();
    }
    
    /**
     * Show Dialog Message Object
     * 
     * @param {String} errorTitle 
     * @param {String} description 
     */
    showMessage(messageTitle, description) {
        this.alertTitle.innerText = messageTitle; 
        this.alertDescription.innerHTML = description;       
               
        this.#updateMessageSetup();

        this.#showDialog();
    }

    /**
     * Update Dialog Title Style for message
     */
    #updateMessageSetup() {
        this.alertTitle.style.fontWeight = "500";
        this.alertTitle.style.fontSize = "1.3rem";
        this.alertTitle.style.color = "black";
        this.alertTitle.style.textAlign = "left";

        this.alertDescription.style.textAlign = "left"; 
    }

    /**
     * Update Dialog Title Style for error code
     */
    #updateErrorCodeSetup() {
        this.alertTitle.style.fontWeight = "bolder";
        this.alertTitle.style.fontSize = "5rem";
        this.alertTitle.style.color = "red";
        this.alertTitle.style.textAlign = "center";

        this.alertDescription.style.textAlign = "center";  
    }
    
    /**
     * Show Dialog
     */
    #showDialog() {
        this.#checkActiveTimer();
                
        document.querySelector(this.parentElement).appendChild(this.dialog);
    
        let marginLeft = this.dialog.offsetWidth / 2;    
        this.dialog.style.marginLeft = `-${marginLeft}px`;
    
        this.alertTimer = setTimeout(() => {
            this.#hideDialog();
        }, this.time);
    }
    
    /**
     * Hide Dialog
     */
    #hideDialog() {        
        if(document.getElementById("alert-dialog") != undefined) {
            document.querySelector(this.parentElement).removeChild(document.getElementById("alert-dialog"));
        }    
    }

    /**
     * Check Active Timer
     */
    #checkActiveTimer() {
        if(this.alertTimer != undefined) {
            clearTimeout(this.alertTimer);
            this.alertTimer = null;
            this.#hideDialog();
        }
    }
}





