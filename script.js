// Get the file input and gallery container
const imageUpload = document.getElementById('imageUpload');
const galleryGrid = document.querySelector('.gallery-grid');

// Function to handle image upload
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'uploaded-image'; // Add class for styling
            galleryGrid.appendChild(img);
        };
        
        reader.readAsDataURL(file); // Convert image to data URL for preview
    }
});
const dropZone = document.getElementById('dropZone');

// Function to handle file drop
function handleDrop(event) {
    event.preventDefault();
    dropZone.classList.remove('drag-over');

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'uploaded-image';
            galleryGrid.appendChild(img);
        };
        
        reader.readAsDataURL(file);
    }
}

// Highlight drop zone on drag over
dropZone.addEventListener('dragover', function(event) {
    event.preventDefault();
    dropZone.classList.add('drag-over');
});

// Remove highlight on drag leave
dropZone.addEventListener('dragleave', function() {
    dropZone.classList.remove('drag-over');
});

// Handle drop
dropZone.addEventListener('drop', handleDrop);

const apiKey = 'your-api-key-here';  // Replace with your DALL·E API key
const imageContainer = document.getElementById('image-container'); // Div where images will be displayed

// Function to generate image
function generateImage(prompt) {
    fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        }),
    })
    .then(response => response.json())
    .then(data => {
        const imageUrl = data.data[0].url;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Generated Image';
        imageContainer.innerHTML = ''; // Clear any previous images
        imageContainer.appendChild(img);
    })
    .catch(error => console.error('Error:', error));
}

// Call the function with a test prompt
generateImage('A cute kitten playing with yarn');
