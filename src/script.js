function fetchData() {
    fetch('../data/destinations.json')
        .then(response => response.json())
        .then(data => {
            // run function to create cards
            createCards(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function createCards(data) {
    const template = document.getElementById('data-template'); // get the template 'data-template'
    const container = document.querySelector('.data-container');

    // no need to slice since there is only 8 destinations
    // if there were more destinations, we would need to slice the data
    const apartmentData = data.destinations.map(destination => ({
        ...destination,
        image: `../img/${destination.image}`,
        id: `apartment-${destination.id}`,
        link: `#apartment-${destination.id}`
    }))

    apartmentData.forEach(apartment => {
        const clone = template.content.cloneNode(true); // clone the template 'template'

        // update the image source and alt text
        const image = clone.querySelector('.card-image img');
        image.src = apartment.image;
        image.alt = apartment.id;

        // update the more link
        const link = clone.querySelector('a');
        // add url parameter to the link
        link.href = `destination.html?id=${apartment.id}`;

        // append the clone to the container
        container.appendChild(clone);
    })
}

function createDestination(data) {
    // Update destination image
    const destinationImg = document.getElementById('destination-img');
    if (destinationImg) {
        destinationImg.src = `../img/${data.image}`;
        destinationImg.alt = `Image of ${data.title}`;
    }

    // Update destination title
    const destinationTitle = document.getElementById('destination-title');
    if (destinationTitle) {
        destinationTitle.textContent = data.title;
    }

    // Update destination subtitle
    const destinationSubtitle = document.getElementById('destination-subtitle');
    if (destinationSubtitle) {
        destinationSubtitle.textContent = data.subtitle;
    }

    // Update destination text
    const destinationText = document.getElementById('destination-text');
    if (destinationText) {
        destinationText.textContent = data.text;
    }

    // Update facilities list
    const facilitiesList = document.getElementById('facilities-list');
    if (facilitiesList && data.facilities) {
        facilitiesList.innerHTML = ''; // Clear existing content
        data.facilities.forEach(facility => {
            const listItem = document.createElement('li');
            listItem.textContent = facility;
            facilitiesList.appendChild(listItem);
        });
    }
}


function fetchDestination(id) {
    fetch(`../data/${id.replace('apartment-', '')}.json`)
        .then(response => response.json())
        .then(data => {
            createDestination(data);
        })
}

// only use fetchDestination if the url has a parameter
if (window.location.search) {
    const id = window.location.search.split('=')[1];
    fetchDestination(id);
} else {
    fetchData();
}