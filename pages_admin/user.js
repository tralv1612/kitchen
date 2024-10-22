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

document.addEventListener("DOMContentLoaded", function() {
    // Call API to fetch users data
    fetch('https://www.kitchenbuddy.somee.com/api/v1/dashboards/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Render the users table
        renderUserTable(data);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
});

function renderUserTable(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; // Clear any existing rows

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.createDate}</td>
            <td>${user.startDateMember || 'N/A'}</td>
            <td>${user.expireDateMember || 'N/A'}</td>
            <td>${user.totalDays}</td>
            <td>${user.isMember ? 'Yes' : 'No'}</td>
        `;

        tableBody.appendChild(row);
    });
}
