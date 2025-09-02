const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const id = params.get("id");

const handleDestinationLoad = async () => {
    try {
        const response = await fetch(`./data/${id}.json`);
        const data = await response.json();
        
        // Update image
        const img = document.querySelector("figure img");
        img.src = `img/${data.image}`;
        img.alt = data.title;
        
        // Update content
        const article = document.querySelector("article.grid-info");
        const h1 = article.querySelector("h1");
        const h2 = article.querySelector("h2");
        const pTags = article.querySelectorAll("p");
        const ul = article.querySelector("ul");
        
        h2.textContent = data.destination;
        h1.textContent = data.title;
        pTags[0].textContent = data.subtitle;
        pTags[1].textContent = data.text;
        
        // Clear existing facilities and add new ones
        ul.innerHTML = "";
        data.facilities.forEach(facility => {
            const li = document.createElement("li");
            li.textContent = facility;
            ul.appendChild(li);
        });
        
        // Setup heart functionality
        setupHeartFunctionality();
        
    } catch (error) {
        console.error("Error loading destination data:", error);
    }
};

const setupHeartFunctionality = () => {
    const heart = document.querySelector('.destination-heart');
    
    if (heart) {
        heart.addEventListener('click', handleHeartClick);
        
        // Check if this destination is already liked
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const id = params.get("id");
        
        const likedDestinations = JSON.parse(localStorage.getItem('likedDestinations') || '[]');
        if (likedDestinations.includes(id)) {
            heart.classList.add('liked');
        }
    }
};

const handleHeartClick = (event) => {
    const heart = event.target.closest('.destination-heart');
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get("id");
    
    if (!heart || !id) return;
    
    let likedDestinations = JSON.parse(localStorage.getItem('likedDestinations') || '[]');
    
    if (heart.classList.contains('liked')) {
        // Remove from liked
        heart.classList.remove('liked');
        likedDestinations = likedDestinations.filter(destinationId => destinationId !== id);
    } else {
        // Add to liked
        heart.classList.add('liked');
        if (!likedDestinations.includes(id)) {
            likedDestinations.push(id);
        }
    }
    
    localStorage.setItem('likedDestinations', JSON.stringify(likedDestinations));
};

handleDestinationLoad();