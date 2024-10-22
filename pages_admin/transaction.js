document.addEventListener("DOMContentLoaded", function() {
    // Call API to fetch transactions data
    fetch('https://www.kitchenbuddy.somee.com/api/v1/dashboards/transactions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Render the transactions table
        renderTransactionTable(data);
    })
    .catch(error => {
        console.error('Error fetching transactions:', error);
    });
});

function renderTransactionTable(transactions) {
    const tableBody = document.getElementById('transactionTableBody');
    tableBody.innerHTML = ''; // Clear any existing rows

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.userName}</td>
            <td>${transaction.id}</td>
            <td>${transaction.transactionDate}</td>
            <td>${transaction.transactionCode}</td>
            <td>${transaction.price.toLocaleString()} VND</td>
            <td>${transaction.validityPeriod}</td>
            <td>${transaction.validityDays}</td>
            <td>${transaction.status}</td>
        `;

        tableBody.appendChild(row);
    });
}


document.getElementById('btnLogout').addEventListener('click', function () {
    window.location.href = '../login.html';
})
document.getElementById('btnOrder').addEventListener('click', function () {
    window.location.href = '../pages_admin/transaction.html';
})

document.getElementById('btnNotify').addEventListener('click', function () {
    window.location.href = '../pages_admin/admin_dashboard.html';
})

document.getElementById('btnUser').addEventListener('click', function () {
    window.location.href = '../pages_admin/user.html';
})