function fetchRecipes() {
    const recipeSelect = document.getElementById('recipe');
    const selectedValue = recipeSelect.value;
    const url = `https://www.kitchenbuddy.somee.com/api/v1/recipes?diet=${selectedValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear previous options
            const titlesSelectBreakfast = document.getElementById('recipe-titles');
            const titlesSelectLunch = document.getElementById('recipe-titles-lunch');
            const titlesSelectDinner = document.getElementById('recipe-titles-dinner');

            titlesSelectBreakfast.innerHTML = '';
            titlesSelectLunch.innerHTML = '';
            titlesSelectDinner.innerHTML = '';

            // Add new options
            data.forEach(recipe => {
                const optionBreakfast = document.createElement('option');
                optionBreakfast.value = recipe.recipeId;
                optionBreakfast.textContent = recipe.title;
                titlesSelectBreakfast.appendChild(optionBreakfast);

                const optionLunch = document.createElement('option');
                optionLunch.value = recipe.recipeId;
                optionLunch.textContent = recipe.title;
                titlesSelectLunch.appendChild(optionLunch);

                const optionDinner = document.createElement('option');
                optionDinner.value = recipe.recipeId;
                optionDinner.textContent = recipe.title;
                titlesSelectDinner.appendChild(optionDinner);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
}


let selectedRecipes = [];

function addRecipe() {
    const selectElement = document.getElementById('recipe-titles');
    const selectedValue = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    if (selectedValue !== 'None' && !selectedRecipes.includes(selectedValue)) {
        selectedRecipes.push(selectedValue);

        const newParagraph = document.createElement('p');
        newParagraph.textContent = selectedText;
        document.getElementById('selected-recipes').appendChild(newParagraph);
    }
}

function addRecipeLunch() {
    const selectElement = document.getElementById('recipe-titles-lunch');
    const selectedValue = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    if (selectedValue !== 'None' && !selectedRecipes.includes(selectedValue)) {
        selectedRecipes.push(selectedValue);

        const newParagraph = document.createElement('p');
        newParagraph.textContent = selectedText;
        document.getElementById('selected-recipes-lunch').appendChild(newParagraph);
    }
}

function addRecipeDinner() {
    const selectElement = document.getElementById('recipe-titles-dinner');
    const selectedValue = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    if (selectedValue !== 'None' && !selectedRecipes.includes(selectedValue)) {
        selectedRecipes.push(selectedValue);

        const newParagraph = document.createElement('p');
        newParagraph.textContent = selectedText;
        document.getElementById('selected-recipes-dinner').appendChild(newParagraph);
    }
}


let dietIdMap = {
    "Daily": 1,
    "Vegetarian": 2,
    "Dietary": 3,
    "Exercise": 4
};

document.getElementById('estimate-btn').addEventListener('click', () => {
    const recipeSelect = document.getElementById('recipe');
    const selectedDiet = recipeSelect.value;
    const dietId = dietIdMap[selectedDiet];

    const payload = {
        dietTypeId: dietId,
        recipeId: selectedRecipes
    };

    fetch('https://www.kitchenbuddy.somee.com/api/v1/recipes/quick-sort', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data);
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });
});

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-details');
    recipeContainer.innerHTML = ''; // Xóa các kết quả cũ

    recipes.forEach(recipe => {
        // Tạo thẻ div cho mỗi recipe
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.recipeId = recipe.recipeId;

        // Thêm hình ảnh
        const img = document.createElement('img');
        img.classList.add('recipe-image');
        img.src = recipe.imageUrl || 'default-image.png'; // Thay thế bằng hình ảnh mặc định nếu không có
        img.alt = recipe.title;

        // Thêm tiêu đề
        const title = document.createElement('h3');
        title.classList.add('recipe-title');
        title.textContent = recipe.title;

        // Thêm mô tả
        const description = document.createElement('p');
        description.classList.add('recipe-description');
        description.textContent = recipe.description;

        // Gắn các phần tử vào thẻ div
        recipeCard.appendChild(img);
        recipeCard.appendChild(title);
        recipeCard.appendChild(description);

        // Thêm sự kiện click cho thẻ div
        recipeCard.addEventListener('click', () => {
            const recipeId = recipeCard.dataset.recipeId;
            window.location.href = `recipe-details.html?recipeId=${recipeId}`;
        });

        // Gắn thẻ div vào container
        recipeContainer.appendChild(recipeCard);
    });
}

document.getElementById("button-forum").addEventListener("click", function() {
    window.location.href = "../pages/forum.html";
});