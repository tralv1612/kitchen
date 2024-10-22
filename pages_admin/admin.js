document.addEventListener("DOMContentLoaded", function() {
    fetch('https://www.kitchenbuddy.somee.com/api/v1/dashboards', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Lưu dữ liệu vào session storage
        sessionStorage.setItem('dashboardData', JSON.stringify(data));

        updateDashboard(data);
        // Vẽ các biểu đồ
        createCharts(data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

function createCharts(data) {
    // Lấy dữ liệu từ transactionByDay và userByDay
    const transactionByDaySorted = data.transactionByDay.sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));
    const userByDaySorted = data.userByDay.sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));

    const transactionDates = transactionByDaySorted.map(item => item.date);
    const transactionTotals = transactionByDaySorted.map(item => item.transactionTotal);
    const incomeTotals = transactionByDaySorted.map(item => item.incomeTotal);

    const userDates = userByDaySorted.map(item => item.date);
    const userTotals = userByDaySorted.map(item => parseInt(item.userTotal, 10));  // Ensure userTotal is an integer
    const memberTotals = userByDaySorted.map(item => parseInt(item.memberTotal, 10));

    // Tạo biểu đồ giao dịch
    new Chart(document.getElementById('transactionChart'), {
        type: 'line',
        data: {
            labels: transactionDates,
            datasets: [{
                label: 'Transactions',
                data: transactionTotals,
                borderColor: 'blue',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Transactions by Day' }
            }
        }
    });

    // Tạo biểu đồ người dùng
    new Chart(document.getElementById('userChart'), {
        type: 'line',
        data: {
            labels: userDates,
            datasets: [{
                label: 'Users',
                data: userTotals,
                borderColor: 'green',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Users by Day' }
            }
        }
    });

    // Tạo biểu đồ thành viên
    new Chart(document.getElementById('memberChart'), {
        type: 'line',
        data: {
            labels: userDates,
            datasets: [{
                label: 'Members',
                data: memberTotals,
                borderColor: 'orange',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Members by Day' }
            }
        }
    });

    // Tạo biểu đồ tổng thu nhập
    new Chart(document.getElementById('incomeChart'), {
        type: 'line',
        data: {
            labels: transactionDates,
            datasets: [{
                label: 'Income',
                data: incomeTotals,
                borderColor: 'red',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Income by Day (VND)' }
            }
        }
    });
}



function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateDashboard(data) {
    document.getElementById('totalRevenue').textContent = formatCurrency(data.totalIncome) + ' vnd';
    document.getElementById('totalUsers').textContent = data.totalUser;
    document.getElementById('totalMem').textContent = data.totalMemberShip;
    document.getElementById('totalTrans').textContent = data.totalTransaction;
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