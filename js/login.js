document.getElementById("register").addEventListener("click", function() {
    window.location.href = "../pages/register.html";
});

document.getElementById("forgot-password").addEventListener("click", function() {
    window.location.href = "../pages/forgot_password.html";
});


// login.js

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Add event listener to the login button
// Hàm xử lý đăng nhập
async function handleLogin(event) {
    
    // Lấy giá trị từ input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Đặt URL API dựa trên role
    let url = '';
    if (role === 'user') {
        url = 'https://www.kitchenbuddy.somee.com/api/v1/authenticate/user/login';
        requestData = {
            email: username,
            password: password
        };
    } 
    
    else if (role === 'expert') {
        url = 'https://www.kitchenbuddy.somee.com/api/v1/authenticate/expert/login';
        requestData = {
            email: username,
            password: password
        };
    }
    else if (role === 'admin') {
        url = 'https://www.kitchenbuddy.somee.com/api/v1/authenticate/admin/login';
        requestData = {
            account: username,
            password: password
        };
    }

    try {
        // Gửi request đến API với method POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Kiểm tra status code của response
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            sessionStorage.setItem('account', JSON.stringify(data));
            // Chuyển hướng đến trang chính
            if (role === 'user') {
                window.location.href = "../pages/homepage.html";}
            else if (role === 'expert') {
                window.location.href = "../pages_admin/exper_homepage.html";}
            else {
                window.location.href = "../pages_admin/admin_dashboard.html";}
        } else {
            // In ra thông báo lỗi
            alert('Incorrect email or password.');
        }
    } catch (error) {
        // In ra thông báo lỗi nếu có lỗi trong quá trình fetch
        console.error('Đã xảy ra lỗi:', error);
        alert('Something went wrong. Please try again.');
    }
}

// Gán sự kiện click cho nút đăng nhập


document.getElementById('button-login').addEventListener('click', async function (e) {

    e.preventDefault();

    await handleLogin();

}, true);

