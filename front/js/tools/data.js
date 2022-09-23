class Data {
    static getCurrentURL() {
        return new URL(document.location.href);
    }
    
    static getHrefPropertyValue(key) {        
        return this.getCurrentURL().searchParams.get(key);     
    }

    static getFormOrderFieldsText(errorText) {
        let fieldIds = ["firstName", "lastName", "address", "city", "email"];

        let listRegExp = [
            /^([\w \_\.\-]){1,30}$/,
            /^([\w \_\.\-]){1,30}$/,
            /^([\w \_\.\-]){1,100}$/,
            /^([\w \_\.\-]){1,50}$/,
            /^\w+([\._]?\w)*@\w+([\._]?\w)*\.(\w{2,3})+$/
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