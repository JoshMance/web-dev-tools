const showButton = document.getElementById("showButton");

// Sends a request to the background script
// Returns a promise that resolves with the response info
function msgBackground(action) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: action}, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response.data);
            }
        });
    });
}

// Sends a request to the content script
// Returns a promise that resolves with the response info
function msgContent(action) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: action}, (response) => {
                if (chrome.runtime.lastError) {
                    alert(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError);
                } else {
                    alert(response.data);
                    resolve(response.data);
                }
            });
        });
    });
}

// Reloads the DOM tree visual
async function handleShowButton() {
    try {
        // Requests a handshake with the background script
        // const data = await msgBackground("handshake");
        const data = await msgContent("handshake");

        if (data) {
            const displayPanel = document.getElementById("displayPanel");
            displayPanel.textContent = data;
        } else {
            console.log("Error: No response received");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Setting all button event listeners
showButton.addEventListener("click", handleShowButton);
