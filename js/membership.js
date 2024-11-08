document.addEventListener("DOMContentLoaded", function() {
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var isMember = user.isMember;
    var messageElement = document.querySelector(".container p");

    if (isMember) {
        messageElement.textContent = "As an existing member, you now have access to exclusive member benefits. If you choose to subscribe to an additional plan below, we will extend your current membership duration. Thank you for your continued membership.";
    } else {
        messageElement.textContent = "Join us today and unlock exclusive member benefits!";
    }
});


document.querySelectorAll('.container2 img').forEach(img => {
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var userId = user.userId;

    img.addEventListener('click', async function () {
        const membershipId = this.id;
        const apiUrl = 'https://www.kitchenbuddy.somee.com/api/v1/transactions/add?type=Cake';
            // Redirect to qr.html
            window.location.href = 'qr.html';
    });
    
});