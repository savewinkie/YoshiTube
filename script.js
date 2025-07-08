// Message box functions (kept for consistency across pages)
const messageBox = document.getElementById('message-box');
const messageBoxOverlay = document.getElementById('message-box-overlay');
const messageBoxText = document.getElementById('message-box-text');
const messageBoxOkButton = document.getElementById('message-box-ok');

function showMessageBox(message) {
    if (messageBox && messageBoxText && messageBoxOverlay) {
        messageBoxText.textContent = message;
        messageBox.style.display = 'block';
        messageBoxOverlay.style.display = 'block';
    } else {
        console.warn("Message box elements not found. Cannot display message:", message);
    }
}

function hideMessageBox() {
    if (messageBox && messageBoxOverlay) {
        messageBox.style.display = 'none';
        messageBoxOverlay.style.display = 'none';
    }
}

if (messageBoxOkButton) {
    messageBoxOkButton.addEventListener('click', hideMessageBox);
}

// Logic specific to index.html (video grid rendering)
if (document.getElementById('video-grid')) {
    const videoGrid = document.getElementById('video-grid');

    // Mock Video Data
    const mockVideos = [
        { id: 'v1', title: 'Relaxing Nature Sounds', channel: 'Nature Explorer', thumbnail: 'https://placehold.co/320x180/81C784/FFFFFF?text=Nature+Video' },
        { id: 'v2', title: 'Coding Basics Tutorial', channel: 'Code Master', thumbnail: 'https://placehold.co/320x180/42A5F5/FFFFFF?text=Coding+Lesson' },
        { id: 'v3', title: 'Travel Vlog: City Break', channel: 'Wanderlust Diaries', thumbnail: 'https://placehold.co/320x180/FFB300/FFFFFF?text=City+Vlog' },
        { id: 'v4', title: 'Quick Cooking Recipe', channel: 'Chef\'s Kitchen', thumbnail: 'https://placehold.co/320x180/9C27B0/FFFFFF?text=Recipe+Video' },
        { id: 'v5', title: 'Morning Workout Routine', channel: 'Fitness Guru', thumbnail: 'https://placehold.co/320x180/009688/FFFFFF?text=Workout' },
        { id: 'v6', title: 'DIY Home Decor Ideas', channel: 'Crafty Creations', thumbnail: 'https://placehold.co/320x180/DDA0DD/FFFFFF?text=DIY+Decor' },
    ];

    // Function to render video cards
    function renderVideoGrid() {
        videoGrid.innerHTML = ''; // Clear existing videos
        mockVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" onerror="this.onerror=null;this.src='https://placehold.co/320x180/333333/FFFFFF?text=Video';">
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.channel}</p>
                </div>
            `;
            videoCard.addEventListener('click', () => {
                showMessageBox(`Playing video: "${video.title}" by ${video.channel}`);
                // In a real app, this would load and play the video
            });
            videoGrid.appendChild(videoCard);
        });
    }

    // Initial render of video grid when the page loads
    window.addEventListener('load', renderVideoGrid);
}


// Universal sidebar active class logic
document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item, .subscription-item');
    const currentPath = window.location.pathname.split('/').pop(); // Get current page filename

    sidebarItems.forEach(item => {
        // Remove active class from all items initially
        item.classList.remove('active');

        // Add click listener for visual active state (for non-link items)
        item.addEventListener('click', () => {
            // If it's a link, let the browser handle navigation and active state will be set on new page load
            if (!item.hasAttribute('href')) {
                sidebarItems.forEach(activeItem => activeItem.classList.remove('active'));
                item.classList.add('active');
            }
        });

        // Set active class based on current page URL for navigation links
        if (item.tagName === 'A') { // Check if it's an anchor tag
            const linkPath = item.getAttribute('href').split('/').pop();
            if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                item.classList.add('active');
            }
        } else if (currentPath === 'index.html' && item.querySelector('.sidebar-item-label')?.textContent === 'Home') {
             // Special handling for Home if index.html is the root
             item.classList.add('active');
        }
    });
});
