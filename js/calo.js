
function fetchRecipes() {
    const recipeSelect = document.getElementById('recipe');
    const selectedValue = recipeSelect.value;
    const url = `https://www.kitchenbuddy.somee.com/api/v1/recipes?diet=${selectedValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const titlesSelect = document.getElementById('recipe-titles');
            titlesSelect.innerHTML = ''; // Clear previous options

            data.forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.recipeId;
                option.textContent = recipe.title;
                titlesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

document.getElementById('estimate-btn').addEventListener('click', function() {
    const titlesSelect = document.getElementById('recipe-titles');
    const selectedRecipeId = titlesSelect.value;
    const url = `https://www.kitchenbuddy.somee.com/api/v1/estimate/${selectedRecipeId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const priceInfo = document.getElementById('price-info');
            priceInfo.textContent = `The dish ${data.title} calories from ${data.fromCalories} to ${data.toCalories} Calories.`;
        })
        .catch(error => console.error('Error fetching estimate:', error));
});

document.getElementById("button-forum").addEventListener("click", function() {
    window.location.href = "../pages/forum.html";
});