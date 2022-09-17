/**
 * Affichage et interactions avec la page index.html
 */

const urlListImage = [];

fetch("http://localhost:3000/api/products")
    .then(data => {
        return data.json();
    })
    .then(jsonListProduct => {
        console.log(jsonListProduct);

        createProducts(jsonListProduct);
    });

function createProducts(jsonListProduct){
    if(jsonListProduct != null) {   
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);

            urlListImage.push({"_id": `${product._id}`, "urlImage": `${product.imageUrl}`});

            document.getElementById("items").innerHTML += 
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`;
        }
    }
}

function loadImages(listImages) {
    console.log(listImages);

    if(listImages.length > 0) {
        for(let dataImage of listImages) {
            console.log(dataImage._id);
            document.getElementById(dataImage._id).setAttribute("src", dataImage.urlImage);            
        }
    }    
}
