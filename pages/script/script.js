// script.js

// Function to load navbar.html into navbarContainer
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarContainer').innerHTML = data;
        });
}
function loadSidebar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebarContainer').innerHTML = data;
        });
}
function loadContent() {
    fetch('content.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contentContainer').innerHTML = data;
        });
}

// Call the function to load the navbar when the page loads
window.onload = function() {
    loadNavbar();
    // loadSidebar();
    loadContent();
};
