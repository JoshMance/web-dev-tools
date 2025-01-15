// Listen for messages sent from the popup script, and runs functions to get the requested data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.request === "handshake") {
        // Send a response back to the popup

        // const root = document.documentElement;
        sendResponse({data: "Hi"});
    }

    // Indicates that the response is asynchronous
    return true;
});