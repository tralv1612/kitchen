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

document.getElementById("daily-diet").addEventListener("click", function() {
    window.location.href = "daily_diet.html";
});

document.getElementById("vagetarian-diet").addEventListener("click", function() {
    window.location.href = "vegetarian_diet.html";
});

document.getElementById("dietary").addEventListener("click", function() {
    window.location.href = "dietary.html";
});

document.getElementById("excercise-diet").addEventListener("click", function() {
    window.location.href = "excercise_diet.html";
});
