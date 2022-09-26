/**
 * Class Data
 * - Integrates all Kanap technical data
 * 
 */

class Data {
    /** @static @private @type{String} mRootApiUrl */
    static #mRootApiUrl = "http://localhost:3000/api/products/";
    /** @static @private @type{String} mOrderLink */
    static #mOrderLink = "../html/confirmation.html?orderId=";

    /**
     * Get Kanap root Api Url
     * @returns 
     */
    static get rootApiUrl() {
        return this.#mRootApiUrl;
    }

    /**
     * Get Kanap order page Link
     * @returns 
     */
    static get orderLink() {
        return this.#mOrderLink;
    }

    /**
     * Get client current URL
     * 
     * @returns 
     */
    static getCurrentURL() {
        return new URL(document.location.href);
    }
    
    /**
     * get Href property value
     * 
     * @param {String} key 
     * @returns 
     */
    static getHrefPropertyValue(key) {        
        return this.getCurrentURL().searchParams.get(key);     
    }

    /**
     * Get fields Texts of order form
     * 
     * @param {array.<String>} errorText 
     * @returns 
     */
    static getFieldsTextsOrderForm(errorText) {
        let fieldIds = ["firstName", "lastName", "address", "city", "email"];

        let listRegExp = [
            /^([a-zA-Z \_\.\-]){1,30}$/,
            /^([\w \_\.\-]){1,30}$/,            
            /^([\w \_\.\-]){1,100}$/,
            /^([\w \_\.\-]){1,50}$/,
            /^\w+([\._]?\w)*\w@+([\._]?\w)*\.(\w{2,3})+$/
        ]

        let list = [];

        for(let i = 0; i < fieldIds.length; i++) {
            let field = {};
            field.id = fieldIds[i];
            field.regExp = listRegExp[i];
            field.error = errorText[i];

            list.push(field);
        }
        
        return list;
    }
}