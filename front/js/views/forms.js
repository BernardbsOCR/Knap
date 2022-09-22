class FormOrderCart {
   
    #mFormView;
    #mRegExp;
    #mErrorField;

    constructor(formView, regExp, errorField) {
        this.#mFormView = formView;
        this.#mRegExp = regExp;
        this.#mErrorField = errorField;
    }

    //************************************* */

    get formView () {
        return this.#mFormView;
    }

    get regExp () {
        return this.#mRegExp;
    }

    set regExp (regExp) {
        this.#mRegExp = regExp;
    }

    get errorField() {
        return this.#mErrorField;
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
        let exp = this.regExp[target.id];

        return value.match(exp);
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
            
        return new Contact(firstName, 
            lastName,
            address,
            city,
            email);
    }

    getErrorMessage(fieldName) {
        let id = this.errorField.findIndex((e) => e.name == fieldName);
        return this.errorField[id].error;
    }
}