class ULRTools{
    static getCurrentURL() {
        return new URL(document.location.href);
    }
    
    static getHrefPropertyValue(key) {        
        return this.getCurrentURL().searchParams.get(key);     
    }
}