document.getElementById('button-login').onclick = function() {
    const email = document.getElementById('email').value;
    fetch('https://www.kitchenbuddy.somee.com/api/v1/authenticate/recover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            alert('Your new password has been sent to your email. Please check and log in again!');
            window.location.href = '../pages/login.html';
        } else {
            alert('Email not registered or an error occurred, please try again.');
        }
    })
    .catch(error => {
        alert('Something went wrong. Please try again.');
    });
};


