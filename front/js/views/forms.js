class FormOrderCart {
   
    #mFormView;
    #mTextField;

    constructor(formView, textField) {
        this.#mFormView = formView;
        this.#mTextField = textField;
    }

    //************************************* */

    get formView () {
        return this.#mFormView;
    }

    get textField() {
        return this.#mTextField;
    }

    //************************************* */
    
    checkField(target) {    
        if(target.id != 'order' && target.type == "text" || target.type == "email" ) { 
            return this.isValidField(target);
        }

        return false;
    }

    isValidField(target) {
        let value = document.getElementById(target.id).value;

        let fieldId = this.textField.findIndex((e) => e.id == target.id);

        let regExp = this.textField[fieldId].regExp;

        return value.match(regExp);
    }

    setErrorFieldText(target, message) {
        let field = document.getElementById(target.id).nextSibling;

        field.textContent = message;
    }

    getClientContactData() {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value; 
        
        return {
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "city": city,
            "email": email,
        };
    }            

    getErrorMessage(fieldId) {
        let id = this.textField.findIndex((e) => e.id == fieldId);
        return this.textField[id].error;
    }
}