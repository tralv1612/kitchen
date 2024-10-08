document.querySelectorAll('.container2 img').forEach(img => {
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var userId = user.userId;

    img.addEventListener('click', async function() {
        const membershipId = this.id;

        const apiUrl = 'https://www.kitchenbuddy.somee.com/api/v1/transactions/add?type=Momo';
        const payload = {
            userId: userId,
            membershipId: parseInt(membershipId)
        };

        let attempts = 0;
        const maxAttempts = 4;
        let success = false;

        while (attempts < maxAttempts && !success) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.qr) {
                    window.location.href = data.qr;
                    success = true;
                }
            } catch (error) {
                console.error('Error:', error);
                attempts++;
            }
        }

        if (!success) {
            alert('Failed to complete the transaction after 4 attempts.');
        }
    });
});