// Listen for messages sent from the popup script, and runs functions to get the requested data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "handshake") {
        // Send a response back to the popup
        sendResponse({ info: "Hello from background!"});
    }

    // Returning true indicates that the response is being handled asynchronously
    return true;
});