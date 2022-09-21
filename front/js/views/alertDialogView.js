class AlertDialog {
    alertDialog;
    alertTitle;
    alertDescription;
    alertTimer;

    constructor(parentElement, width, time) {
        this.parentElement = parentElement;
        this.width = width;
        this.time = time;

        this.#setupUI();
    }

    #setupUI() {
        this.alertDialog = this.#getAlertDialog(this.width);
        this.alertTitle = this.#getAlertTitle();  
        this.alertDescription = this.#getAlertDescription();

        this.alertDialog.appendChild(this.alertTitle);
        this.alertDialog.appendChild(this.alertDescription);
    }

    #getAlertDialog(width) {
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

    #getAlertTitle() {
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

    #getAlertDescription() {
        let description = document.createElement("p");
        description.style.width = "100%";
        description.style.height = "fit-content";
        description.style.margin = "1rem";
        description.style.textAlign = "center";
        description.style.color = "black";

        return description;
    } 
    
    showErrorCode(errorTitle, description) {
        this.alertTitle.innerText = errorTitle; 
        this.alertDescription.innerText = description;       
        
        this.#updateErrorCodeSetup();   

        this.#showAlertDialog();
    }
    
    showMessage(messageTitle, description) {
        this.alertTitle.innerText = messageTitle; 
        this.alertDescription.innerHTML = description;       
               
        this.#updateMessageSetup();

        this.#showAlertDialog();
    }

    #updateMessageSetup() {
        this.alertTitle.style.fontWeight = "500";
        this.alertTitle.style.fontSize = "1.3rem";
        this.alertTitle.style.color = "black";
        this.alertTitle.style.textAlign = "left";

        this.alertDescription.style.textAlign = "left"; 
    }

    #updateErrorCodeSetup() {
        this.alertTitle.style.fontWeight = "bolder";
        this.alertTitle.style.fontSize = "5rem";
        this.alertTitle.style.color = "red";
        this.alertTitle.style.textAlign = "center";

        this.alertDescription.style.textAlign = "center";  
    }
    
    #showAlertDialog() {
        this.#checkAlertTimer();
                
        document.querySelector(this.parentElement).appendChild(this.alertDialog);
    
        let marginLeft = this.alertDialog.offsetWidth / 2;    
        this.alertDialog.style.marginLeft = `-${marginLeft}px`;
    
        this.alertTimer = setTimeout(() => {
            this.#hideAlert();
        }, this.time);
    }
    
    #hideAlert() {        
        if(document.getElementById("alert-dialog") != undefined) {
            document.querySelector(this.parentElement).removeChild(document.getElementById("alert-dialog"));
        }    
    }

    #checkAlertTimer() {
        if(this.alertTimer != undefined) {
            clearTimeout(this.alertTimer);
            this.alertTimer = null;
            this.#hideAlert();
        }
    }

    createButton(name) {
        closeButton = document.createElement("a");
        closeButton.setAttribute("href", "./index.html");
        closeButton.style.background = "black";
        closeButton.style.textDecoration = "none";
    
        closeButton.innerText(name);
    }
}





