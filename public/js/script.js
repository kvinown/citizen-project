// Function to load navbar.html into navbarContainer
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarContainer').innerHTML = data;
            // Add event listeners to navbar links
            setupNavLinks();
        });
}

// Function to dynamically load a script
function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}

// Function to load content based on menu
function loadContent(menu) {
    let file;
    switch (menu) {
        case 'home':
            file = 'content.html';
            break;
        case 'penduduk':
            file = 'penduduk/content.html';
            break;
        case 'kartu_keluarga':
            file = 'kartu_keluarga/content.html';
            break;
        default:
            file = 'content.html';
    }
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('contentContainer').innerHTML = data;
            // Load corresponding script
            switch (menu) {
                case 'penduduk':
                    loadScript('/js/penduduk.js');
                    break;
                case 'kartu_keluarga':
                    loadScript('/js/kartu_keluarga.js');
                    break;
            }
        })
        .catch(error => {
            document.getElementById('contentContainer').innerHTML = '404 Not Found';
        });
}

// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to set up event listeners on navbar links
function setupNavLinks() {
    const links = document.querySelectorAll('a.nav-link, a.navbar-brand');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const menu = new URL(link.href).searchParams.get('menu');
            loadContent(menu);
            // Update the URL in the browser without reloading the page
            history.pushState(null, '', `?menu=${menu}`);
        });
    });
}

// Handle popstate event to load content when navigating history
window.addEventListener('popstate', function(event) {
    const menu = getQueryParam('menu') || 'home';
    loadContent(menu);
});

// Call the functions to load the navbar and content when the page loads
window.onload = function() {
    loadNavbar();
    const menu = getQueryParam('menu') || 'home';
    loadContent(menu);
};
