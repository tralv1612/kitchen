// Hàm xử lý đăng ký
async function handleLogin(event) {
    
    // Lấy giá trị từ input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const cfpassword = document.getElementById('cf-password').value;
    const email = document.getElementById('email').value;   
    if (password === cfpassword) {
        try {
            requestData = {
                    "name": username,
                    "email": email,
                    "password": password
            };

            // Gửi request đến API với method POST
            const response = await fetch('https://www.kitchenbuddy.somee.com/api/v1/authenticate/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            // Kiểm tra status code của response
            if (response.status >= 200 && response.status < 300) {

                document.getElementById('verify-popup').style.display = 'block';

                // Gán sự kiện click cho nút xác thực mã
                document.getElementById('button-verify').addEventListener('click', async function () {
                    const verifyCode = document.getElementById('verifyCode').value;

                    // Gửi request đến API xác thực
                    const verifyResponse = await fetch('https://www.kitchenbuddy.somee.com/api/v1/authenticate/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email, // Sử dụng email đã nhập
                            verifyCode: verifyCode // Mã xác thực từ người dùng
                        })
                    });

                    if (verifyResponse.status >= 200 && verifyResponse.status < 300) {
                        alert("You have successfully registered! You will be redirected to the homepage.");
                        window.location.href = "../pages/homepage.html";
                    } else {
                        alert('Incorrect verification code.');
                    }
                });

            } else {
                // In ra thông báo lỗi
                alert("It looks like you've already signed up with this email. Please try logging in or resetting your password.");
            }
        } catch (error) {
            // In ra thông báo lỗi nếu có lỗi trong quá trình fetch
            console.error('Đã xảy ra lỗi:', error);
            alert('Something went wrong. Please try again.');
        }
    } else {
        alert("Oops! It looks like you've entered two different passwords. Please double-check and try again.")
    }

    
}

// Gán sự kiện click cho nút đăng nhập


document.getElementById('button-login').addEventListener('click', async function (e) {

    e.preventDefault();

    await handleLogin();

}, true);