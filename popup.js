const showButton = document.getElementById("showButton");

// Reloads the DOM tree visual
function handleShowButton() {

    // Requests the background script to get the the root node's info
    chrome.runtime.sendMessage({action: "getRoot"}, (response) => {

        // Handles the response from the background script.
        // Outputs the returned info the to display panel.
        const displayPanel = document.getElementById("displayPanel");
        if (response && response.info) {
            displayPanel.textContent = response.info;
        } else {
            displayPanel.textContent = "No response received";
        }
    });
}

showButton.addEventListener("mousedown", handleShowButton);