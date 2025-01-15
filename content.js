function getNodeInfo(node) {
    return node.tagName;
}

// Returns an array of all child nodes for the input node
function getChildren(node) {
    if (node && node.hasChildNodes()) {
        return Array.from(node.children);
    } else {
        return [];
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.request === "getAllNodes") {
        const root = document.documentElement;

        alert(getChildren(root));
        sendResponse({data: getNodeInfo(root)});
    }
    return true; // This ensures an asynchronous response
});
