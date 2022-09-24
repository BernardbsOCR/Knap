//************************************* */

function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response({"ok": true, "status": 200, "statusText": "success"});}
        scriptEle.onerror = (e) => {response({"ok": false, "status": 400, "statusText": "File not found"});}

        document.body.appendChild(scriptEle);
    });
}

Promise.all([
    loadFile("../js/tools/data.js")
])
.then(() => {
    start();
})
.catch((error) => {
    console.log("********loadFile********");
    console.log(error);
});

function start() {
    let orderId = Data.getHrefPropertyValue("orderId");

    document.getElementById('orderId').innerText = orderId;
}

