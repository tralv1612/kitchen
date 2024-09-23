document.getElementById("recipes").addEventListener("click", function() {
    window.location.href = "../pages/recipes.html";
});

document.getElementById("for-you").addEventListener("click", function() {
    window.location.href = "../pages/for_you.html";
});

document.getElementById("about-us").addEventListener("click", function() {
    window.location.href = "../pages/homepage.html";
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
