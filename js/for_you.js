document.getElementById("recipes").addEventListener("click", function() {
    window.location.href = "../pages/recipes.html";
});

document.getElementById("about-us").addEventListener("click", function() {
    window.location.href = "../pages/homepage.html";
});

//bmi//
document.getElementById("bmi").addEventListener("click", function() {
    window.location.href = "../pages/bmi.html";
});
//chat
document.getElementById("chat").addEventListener("click", function() {
    window.location.href = "../pages/chat.html";
});
//plan
document.getElementById("plan").addEventListener("click", function() {
    window.location.href = "../pages/plan.html";
});
//calo
document.getElementById("calo").addEventListener("click", function() {
    window.location.href = "../pages/calo.html";
});
//select
document.getElementById("select").addEventListener("click", function() {
    window.location.href = "../pages/select.html";
});
//cost
document.getElementById("cost").addEventListener("click", function() {
    window.location.href = "../pages/estimate.html";
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