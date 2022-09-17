const currentUrl = document.location.href;
const url = new URL(currentUrl);
const productId = url.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;

console.log(currentUrl);
console.log(urlProduct);

fetch(urlProduct)
    .then(data => {
        return data.json();
    })
    .then(jsonProduct => {
        console.log(jsonProduct);
        let product = new Product(jsonProduct);

        document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
        document.getElementById("title").innerHTML = product.name;
        document.getElementById("price").innerHTML = product.price;
        document.getElementById("description").innerHTML = product.description;

        for(let color of product.colors) {
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`
        }       
    });

