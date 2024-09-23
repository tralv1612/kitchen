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
        url = 'http://www.kitchenbuddy.somee.com/api/v1/authenticate/user/login';
        requestData = {
            email: username,
            password: password
        };
    } else if (role === 'admin') {
        url = 'http://www.kitchenbuddy.somee.com/api/v1/authenticate/admin/login';
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
            const data = await response.json(); // Lấy dữ liệu trả về từ API
            // Đặt thời gian sống của cookie (ví dụ 1 ngày = 86400 giây)
            const maxAge = 86400; // 1 ngày (được tính bằng giây)

            // Lưu các giá trị vào cookie với max-age là 1 ngày
            document.cookie = `userId=${data.userId}; max-age=${maxAge}; path=/;`;
            document.cookie = `email=${data.email}; max-age=${maxAge}; path=/;`;
            // Chuyển hướng đến trang chính
            window.location.href = "../pages/homepage.html";
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
