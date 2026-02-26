// Simple mobile detection
window.isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Set Base Path
window.basePath = isMobile
? "/mobile/"
: "/desktop/";

// Add specific styles
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = window.basePath + "style.css";

document.head.appendChild(link);

// SPA Dynamic Page Loader
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script is running");
    let body = document.querySelector("body");
    let page = document.querySelector(".page");

    function updatePageHTML(pagePath) {
        fetch(pagePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newBody = doc.querySelector('body');

                if (newBody) {
                    body.innerHTML = newBody.innerHTML;
                    main();
                } else {
                    console.error('No body found in the fetched HTML.');
                }
            })
            .catch(error => {
                console.error('Failed to fetch page:', error);
            });

    }

    page.id = "home";

    updatePageHTML(window.basePath + "pages/home.html");
});

function main() {
    // Code for signature tile change
    const tiles = ['--tile1', '--tile2', '--tile3']; // Custom property names
    let currentTile = parseInt(localStorage.getItem('currentTile')) || 0; // Get saved tile index or default to 0

    // Set the initial background tile from localStorage
    document.documentElement.style.setProperty('--bgTile', `var(${tiles[currentTile]})`);

    // Load new JS
    function loadScript(path, callback) {
        const script = document.createElement("script");
        script.type="module";
        script.src = path;
        script.onload = callback;
        document.body.appendChild(script);
      }
    loadScript(window.basePath + "app.js", () => {
        console.log(window.basePath + "app.js loaded!");
      });

    // Make HTML Visible after JS Loads
    document.body.classList.add('visible');
}