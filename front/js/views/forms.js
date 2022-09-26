/**
 * Class FormOrderCart
 * 
 * Allows interaction with the elements of the client of the order form
 */

class FormOrderCart {
   
    /** 
     * @private @type {Object}
     */
    #mFormView;
    /** 
     * @private @type {Array}
     */
    #mFieldsTextsOrderForm;

    /**
     * Initializing FormOrderCart instance
     * 
     * @param {Object} formView 
     * @param {Array} fieldsTextsOrderForm 
     */
    constructor(formView, fieldsTextsOrderForm) {
        this.#mFormView = formView;
        this.#mFieldsTextsOrderForm = fieldsTextsOrderForm;
    }

    //************************************* */

    get formView () {
        return this.#mFormView;
    }

    get fieldsTextsOrderForm() {
        return this.#mFieldsTextsOrderForm;
    }

    //************************************* */
    
    /**
     * check target type
     * 
     * @param {Object} target 
     * @returns 
     */
     onFormFieldChange(target) {    
        if(target.id != 'order' && target.type == "text" || target.type == "email" ) { 
            return this.isValidField(target);
        }

        return false;
    }

    /**
     * Check is valid field
     * 
     * @param {Object} target 
     * @returns 
     */
    isValidField(target) {
        let value = document.getElementById(target.id).value;

        let fieldId = this.fieldsTextsOrderForm.findIndex((e) => e.id == target.id);

        let regExp = this.fieldsTextsOrderForm[fieldId].regExp;

        return value.match(regExp);
    }

    /**
     * Set field error message
     * 
     * @param {Object} target 
     * @param {String} message 
     */
    setErrorFieldText(target, message) {
        let field = document.getElementById(target.id).nextSibling;

        field.textContent = message;
    }

    /**
     * Get client contact data
     * 
     * @returns 
     */
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

    /**
     * get Error Message
     * 
     * @param {String} fieldId 
     * @returns 
     */
    getErrorMessage(fieldId) {
        let id = this.fieldsTextsOrderForm.findIndex((e) => e.id == fieldId);
        return this.fieldsTextsOrderForm[id].error;
    }
}