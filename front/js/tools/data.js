class Data{
    static getCurrentURL() {
        return new URL(document.location.href);
    }
    
    static getHrefPropertyValue(key) {        
        return this.getCurrentURL().searchParams.get(key);     
    }

    static getFormOrderRegExp() {
        let expName = /^([\w \_\.\-]){1,30}$/;
        let expAddress = /^([\w \_\.\-]){1,100}$/;
        let city =  /^([\w \_\.\-]){1,50}$/;
        let expEmail = /^\w+([\._]?\w)*@\w+([\._]?\w)*\.(\w{2,3})+$/;

        return {
            "firstName" : expName, 
            "lastName" : expName,
            "address" : expAddress,
            "city" : city,
            "email" : expEmail
        };
    }

    static getFormOrderFieldsText(errorText) {
        let fieldsName = ["firstName", "lastName", "address", "city", "email"];

        let list = [];
        for(let i = 0; i < fieldsName.length; i++) {
            let field = {};
            field.name = fieldsName[i];
            field.error = errorText[i];

            list.push(field);
        }
        
        return list;
    }
}