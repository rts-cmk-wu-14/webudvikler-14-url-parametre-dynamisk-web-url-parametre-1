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

fetchData();