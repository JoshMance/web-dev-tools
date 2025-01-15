chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);
    if (message.action === "handshake") {
        sendResponse({data: "This is data from the content script"});
    }
    return true; // This ensures an asynchronous response
});
