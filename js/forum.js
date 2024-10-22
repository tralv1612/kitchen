document.getElementById("recipes").addEventListener("click", function() {
    window.location.href = "../pages/recipes.html";
});

document.getElementById("about-us").addEventListener("click", function() {
    window.location.href = "../pages/homepage.html";
});

document.getElementById("for-you").addEventListener("click", function() {
    window.location.href = "../pages/for_you.html";
});

function togglePopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.toggle('hidden');
}

window.onclick = function(event) {
    const overlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
    if (event.target == overlay && !popup.contains(event.target)) {
        overlay.classList.add('hidden');
    }
};
/* load */
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from the API once the page is loaded
    fetchArticles();
});

function fetchArticles() {
    fetch('https://www.kitchenbuddy.somee.com/api/v1/recipes?diet=Vegetarian', {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayarticles(data);
    })
    .catch(error => {
        console.error('Error fetching articles:', error);
    });
}

function displayarticles(articles) {
    const articleContainer = document.getElementById('article-container');

    articles.forEach(article => {
        // Create the article card
        const articleCard = document.createElement('div');
        articleCard.classList.add('article-card');
        articleCard.dataset.articleId = article.articleId;

        // Add image
        const img = document.createElement('img');
        img.classList.add('article-image');
        img.src = article.imageUrl || 'default-image.png'; // Replace with default image if none is provided
        img.alt = article.title;

        // Add title
        const title = document.createElement('h3');
        title.classList.add('article-title');
        title.textContent = article.title;

        // Add description
        const description = document.createElement('p');
        description.classList.add('article-description');
        description.textContent = article.description;

        // Append elements to the article card
        articleCard.appendChild(img);
        articleCard.appendChild(title);
        articleCard.appendChild(description);

        // Add event listener for clicking on the article card
        articleCard.addEventListener('click', () => {
            const articleId = articleCard.dataset.articleId;
            window.location.href = `article-details.html?articleId=${articleId}`;
        });

        // Append article card to the container
        articleContainer.appendChild(articleCard);
    });
}