function getInfo(node) {
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

// Runs a BFS search on a part of the DOM tree to a given maxDepth.
function breadthFirstSearch(root, maxDepth) {
    const queue = [root];
    const nodeInfo = [getInfo(root)];
    while (queue.length) {
        // Dequeuing a node from the queue, finding all of its child nodes and enqueueing them
        const node = queue.shift();
        for (const child of getChildren(node)) {
            queue.push(child);
            nodeInfo.push(getInfo(child));
        }
    }
    return nodeInfo;
}

// Traverses the DOM tree using the traversal algorithm set by the mode
// The options for mode are: [bfs, ]
// Returns 
function traverseDOM(mode) {
    const root = document.documentElement;
    if (mode === "bfs") {
        return breadthFirstSearch(root, 5);
    }
    else {
        return null;
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.request === "getAllNodes") {

        const nodeInfo = traverseDOM("bfs");
        sendResponse({data: nodeInfo});
        
    }
    return true; // This ensures an asynchronous response
});
