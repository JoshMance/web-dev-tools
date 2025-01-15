const showButton = document.getElementById("showButton");

// Sends a request to the background script
// Returns a promise that resolves with the response info
function sendToBackground(action) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: action }, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response.info);
            }
        });
    });
}

// Reloads the DOM tree visual
async function handleShowButton() {
    try {
        // Requests a handshake with the background script
        const info = await sendToBackground("handshake");

        if (info) {
            const displayPanel = document.getElementById("displayPanel");
            displayPanel.textContent = info;
        } else {
            console.log("Error: No response received");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Setting all button event listeners
showButton.addEventListener("mousedown", handleShowButton);
