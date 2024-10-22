
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
    fetch('https://www.kitchenbuddy.somee.com/api/v1/posts?category=Kitchen', {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayArticles(data);
    })
    .catch(error => {
        console.error('Error fetching articles:', error);
    });
}

function displayArticles(articles) {
    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML = ''; // Clear the container before adding new articles

    articles.forEach(article => {
        // Create the article card
        const articleCard = document.createElement('div');
        articleCard.classList.add('article-card');
        articleCard.dataset.articleId = article.postId;

        // Add image
        const img = document.createElement('img');
        img.classList.add('article-image');
        img.src = article.imageUrl || '../images/logo.png'; // Use default image if none is provided
        img.alt = article.title;

        // Add title
        const title = document.createElement('h3');
        title.classList.add('article-title');
        title.textContent = article.title;

        // Append elements to the article card
        articleCard.appendChild(img);
        articleCard.appendChild(title);

        if (article.category === "Kitchen Story") {
            // Create a container for the expert badge
            const expertBadge = document.createElement('p');
            expertBadge.innerHTML = '⭐ <strong>Post by an Expert</strong>'; // Yellow star and text
            expertBadge.style.color = '#FFD700'; // Set the text color to gold (yellow star)

            // Append the expert badge to the article card
            articleCard.appendChild(expertBadge);
        }

        // Add event listener for clicking on the article card
        articleCard.addEventListener('click', () => {
            const articleId = articleCard.dataset.articleId;
            window.location.href = `article-details.html?articleId=${articleId}`;
        });

        // Append article card to the container
        articleContainer.appendChild(articleCard);
    });
}


document.getElementById('btnPost').addEventListener('click', function () {
    // Get the input values
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Define fixed posterId and categoryId
    const posterId = 2;
    const categoryId = 1;

    // Create the post object
    const postData = {
        title: title,
        content: content,
        posterId: posterId,
        categoryId: categoryId
    };

    // Call the API using fetch
    fetch('https://www.kitchenbuddy.somee.com/api/v1/posts/create', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            alert('Post created successfully!');
            // Reload the page after a successful post
            window.location.reload();
        } else {
            alert('Failed to create post. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the post.');
    });
});