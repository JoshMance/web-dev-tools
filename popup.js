const showButton = document.getElementById("showButton");

// Sends a request to the background script
// Returns a promise that resolves with the response info
function getDataFromBackground(request) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({request: request}, (response) => {
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
function getDataFromContent(request) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {request: request}, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
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
        // const data = await getDataFromBackground("handshake");
        const data = await getDataFromContent("getAllNodes");

        if (data) {
            const chart = document.getElementById("chart");
            chart.textContent = data;
        } else {
            console.log("Error: No response received");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Setting all button event listeners
showButton.addEventListener("click", handleShowButton);
