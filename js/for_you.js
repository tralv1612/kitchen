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
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var isMember = user.isMember;

    if (isMember === false) {
        alert("To use this feature, you'll need to become a member.")
    }
});

//plan
document.getElementById("plan").addEventListener("click", function() {
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var isMember = user.isMember;

    if (isMember === true) {
        window.location.href = "../pages/plan.html";
    }
    else {
        alert("To use this feature, you'll need to become a member.")
    }
});

//calo
document.getElementById("calo").addEventListener("click", function() {
    window.location.href = "../pages/calo.html";
});
//select
document.getElementById("select").addEventListener("click", function() {
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var isMember = user.isMember;

    if (isMember === true) {
        window.location.href = "../pages/select.html";
    }
    else {
        alert("To use this feature, you'll need to become a member.")
    }
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

document.getElementById("button-forum").addEventListener("click", function() {
    window.location.href = "../pages/forum.html";
});