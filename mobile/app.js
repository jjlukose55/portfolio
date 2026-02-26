// Import Paths
import { ASSETS, DATA_SOURCES } from "/config/config.js";

// Style Variables (Used for dynamic theming)
const tiles = ['--tile1', '--tile2', '--tile3'];
const signature = document.getElementById('signature');

// Code for signature tile change
let currentTile = parseInt(localStorage.getItem('currentTile')) || 0; // Get saved tile index or default to 0
// Set the initial background tile from localStorage
document.documentElement.style.setProperty('--bgTile', `var(${tiles[currentTile]})`);

signature.addEventListener('click', () => {
    // Change the background tile
    currentTile = (currentTile + 1) % tiles.length; // Cycle to the next tile
    document.documentElement.style.setProperty('--bgTile', `var(${tiles[currentTile]})`);
    // Save the current tile index in localStorage
    localStorage.setItem('currentTile', currentTile);
});

// Function to fetch and populate contact data
async function populateContactData() {
    try {
        // Fetch data from JSON file
        const response = await fetch(DATA_SOURCES.contact);
        const data = await response.json();

        // Get contact card elements
        const contactItemsContainer = document.querySelector('#contact-items');
        const socialItemsContainer = document.querySelector('#social-items');

        // Populate contact items
        data.contact.forEach(item => {
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.className = 'item contact-card';

            const imgElement = document.createElement('img');
            imgElement.src = item.icon;
            imgElement.alt = item.title;
            imgElement.className = 'socialIcons';

            const divElement = document.createElement('div');
            divElement.className = 'subtext text';
            divElement.textContent = item.title;

            linkElement.appendChild(imgElement);
            linkElement.appendChild(divElement);
            contactItemsContainer.appendChild(linkElement);
        });

        // Populate social items
        data.social.forEach(item => {
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.className = 'item contact-card';

            const imgElement = document.createElement('img');
            imgElement.src = item.icon;
            imgElement.alt = item.title;
            imgElement.className = 'socialIcons';

            const divElement = document.createElement('div');
            divElement.className = 'subtext text';
            divElement.textContent = item.title;

            linkElement.appendChild(imgElement);
            linkElement.appendChild(divElement);
            socialItemsContainer.appendChild(linkElement);
        });

    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

// Initialize the script when the page loads
populateContactData();
