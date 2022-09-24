class CartCounter {
    
    static getCounter(id) {
        let counter = document.createElement("p");
        counter.id = id;
        counter.style.width = "fit-content";
        counter.style.minWidth = ".9rem";
        counter.style.height = "fit-content";        
        counter.style.fontSize = "0.7rem";
        counter.style.fontWeight = "600";
        counter.style.background = "red";
        counter.style.padding = "0.2rem";
        counter.style.marginTop = "-.5rem";
        counter.style.marginLeft = ".2rem";
        counter.style.borderRadius = "50% 50%";
        counter.style.textAlign = "center";
        counter.style.border = "2px solid var(--main-color)";
    
        return counter;
    }
}