class ULRTools{
    static getCurrentURL() {
        return new URL(document.location.href);
    }
    
    static getHrefProperty(key) {        
        return this.getCurrentURL().searchParams.get(key);     
    }
}