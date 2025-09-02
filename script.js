/* fetch destinations data and generate cards using template */
const handleDestinationsLoad = async () => {
    try {
        const response = await fetch("./data/destinations.json");
        const data = await response.json();
        
        if (data.destinations && Array.isArray(data.destinations)) {
            generateDestinationCards(data.destinations);
        }
    } catch (error) {
        console.error("err", error); // hvis der sker en fejl, vil den blive logget
    }
};

const generateDestinationCards = (destinations) => {
    const wrapper = document.getElementById("wrapper");
    const template = document.getElementById("card-template");
    
    if (!template) {
        console.error("card template not found");
        return;
    }
    
    // clear existing content except template
    const existingCards = wrapper.querySelectorAll(".card:not(template .card)");
    existingCards.forEach(card => card.remove());
    
    destinations.forEach(destination => {
        const cardClone = template.content.cloneNode(true);
        const card = cardClone.querySelector(".card");
        
        // set image
        const img = card.querySelector("img");
        img.src = `img/${destination.image}`;
        img.alt = destination.title;
        
        // add destination info
        const cardContent = card.querySelector(".card-content");
        
        // create actions container
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "card-actions";
        
        // move heart icon and more link to actions container
        const heartIcon = card.querySelector(".lucide-heart");
        const moreLink = card.querySelector("a");
        
        // add event listener for heart icon
        heartIcon.addEventListener("click", () => {
            heartIcon.classList.toggle("liked");
        });
        
        // update more link
        moreLink.href = `destination.html?id=${destination.id}`;
        moreLink.textContent = "More";
        
        // move elements to actions container
        actionsContainer.appendChild(heartIcon);
        actionsContainer.appendChild(moreLink);
        
        // add actions container to card content
        cardContent.appendChild(actionsContainer);
        
        wrapper.appendChild(cardClone);
    });
};

handleDestinationsLoad();