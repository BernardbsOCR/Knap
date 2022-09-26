//************************************* */

/**
 * Create a promise to add a "script" element in the document body
 * 
 * @param {String} file Source of the file to load
 * @returns {Promise} The Promise's response
 */
function loadFile(file) {
    return new Promise(response => {
        let scriptEle = document.createElement("script");
        scriptEle.setAttribute("src", file);
        scriptEle.onload = () => {response({"ok": true, "status": 200, "statusText": "success"});}
        scriptEle.onerror = (e) => {response({"ok": false, "status": 400, "statusText": "File not found"});}

        document.body.appendChild(scriptEle);
    });
}

/**
 * Chain of Promise {addJSScript}
 */
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

/**
 * Start JS code
 */
function start() {
    updateUI();
}

/**
 * Update user interface
 */
function updateUI() {
    let orderId = Data.getHrefPropertyValue("orderId");

    document.getElementById('orderId').innerText = orderId;
}