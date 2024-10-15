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

        // Cập nhật nội dung DOM
        updateDashboard(data);

        // Vẽ biểu đồ cột chỉ thể hiện % của hôm nay
        const ctx = document.getElementById('columnChart').getContext('2d');
        const totalData = [data.totalIncome, data.totalUser, data.totalMemberShip, data.totalTransaction];
        const todayData = [data.totalIncomeToday, data.totalUserToday, data.totalMemberShipToday, data.totalTransactionToday];
        const percentageData = todayData.map((value, index) => (value / totalData[index]) * 100);

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Users', 'Memberships', 'Transactions'],
                datasets: [{
                    label: 'Today (%)',
                    data: percentageData,
                    backgroundColor: 'rgba(153, 204, 255, 0.6)',
                    borderColor: 'rgba(153, 204, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,  // Giới hạn trục y ở mức 100% để mọi cột đều có chiều cao tương đương
                        title: {
                            display: true,
                            text: 'Percentage (%)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw.toFixed(2)}%`;
                            }
                        }
                    }
                }
            }
        });

        // Tạo bảng để show các giao dịch
        let table = document.createElement('table');
        table.classList.add('transaction-table');
        let header = table.createTHead();
        let headerRow = header.insertRow(0);

        let headers = ['Username', 'ID', 'Transaction Date', 'Transaction Code', 'Price', 'Validity Period', 'Validity Days', 'Status'];
        headers.forEach((header, index) => {
            let cell = headerRow.insertCell(index);
            cell.innerHTML = header;
        });

        let body = table.createTBody();

        data.transactions.forEach(transaction => {
            transaction.transactions.forEach(trans => {
                let row = body.insertRow();
                row.insertCell(0).innerHTML = trans.userName;
                row.insertCell(1).innerHTML = trans.id;
                row.insertCell(2).innerHTML = trans.transactionDate;
                row.insertCell(3).innerHTML = trans.transactionCode;
                row.insertCell(4).innerHTML = trans.price;
                row.insertCell(5).innerHTML = trans.validityPeriod;
                row.insertCell(6).innerHTML = trans.validityDays;
                row.insertCell(7).innerHTML = trans.status;
            });
        });

        document.getElementById('transaction-table-container').appendChild(table);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateDashboard(data) {
    document.getElementById('totalRevenue').textContent = formatCurrency(data.totalIncome) + ' vnd';
    document.getElementById('totalUsers').textContent = data.totalUser;
    document.getElementById('totalMem').textContent = data.totalMemberShip;
    document.getElementById('totalTrans').textContent = data.totalTransaction;
    document.getElementById('todayRevenue').textContent = "Today's revenue: " + data.totalIncomeToday;
    document.getElementById('todayTrans').textContent = "Today's Transaction: " + data.totalTransactionToday;
    document.getElementById('todayUsers').textContent = "New Users: " + data.totalUserToday;
    document.getElementById('todayMembers').textContent = "New Memberships: " + data.totalMemberShipToday;
}

document.getElementById('btnLogout').addEventListener('click', function () {
    window.location.href = '../login.html';
})
document.getElementById('btnOrder').addEventListener('click', function () {
    window.location.href = '../page_admin/admin_orders.html';
})
document.getElementById('btnNotify').addEventListener('click', function () {
    window.location.href = '../page_admin/admin_dashboard.html';
})