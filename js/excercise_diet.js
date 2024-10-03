document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from the API once the page is loaded
    fetchRecipes();
});

function fetchRecipes() {
    fetch('https://www.kitchenbuddy.somee.com/api/v1/recipes?diet=Exercise', {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data);
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');

    recipes.forEach(recipe => {
        // Create the recipe card
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.recipeId = recipe.recipeId;

        // Add image
        const img = document.createElement('img');
        img.classList.add('recipe-image');
        img.src = recipe.imageUrl || 'default-image.png'; // Replace with default image if none is provided
        img.alt = recipe.title;

        // Add title
        const title = document.createElement('h3');
        title.classList.add('recipe-title');
        title.textContent = recipe.title;

        // Add description
        const description = document.createElement('p');
        description.classList.add('recipe-description');
        description.textContent = recipe.description;

        // Append elements to the recipe card
        recipeCard.appendChild(img);
        recipeCard.appendChild(title);
        recipeCard.appendChild(description);

        // Add event listener for clicking on the recipe card
        recipeCard.addEventListener('click', () => {
            const recipeId = recipeCard.dataset.recipeId;
            window.location.href = `recipe-details.html?recipeId=${recipeId}`;
        });
        

        // Append recipe card to the container
        recipeContainer.appendChild(recipeCard);
    });
}
