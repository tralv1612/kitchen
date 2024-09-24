document.getElementById("recipes").addEventListener("click", function() {
    window.location.href = "../pages/recipes.html";
});

document.getElementById("for-you").addEventListener("click", function() {
    window.location.href = "../pages/for_you.html";
});

document.getElementById("about-us").addEventListener("click", function() {
    window.location.href = "../pages/homepage.html";
});

function togglePopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.toggle('hidden');
}

window.onclick = function(event) {
    const overlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
    if (event.target == overlay && !popup.contains(event.target)) {
        overlay.classList.add('hidden');
    }
};



document.getElementById('button-change').addEventListener('click', function (event) {
    // Ngăn chặn form submit mặc định
    event.preventDefault();

    // Lấy giá trị mật khẩu mới và xác nhận mật khẩu
    var newPassword = document.getElementById('newpassword').value;
    var confirmPassword = document.getElementById('cfpassword').value;

    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu không trùng khớp!');
        return;
    }

    // Lấy email từ sessionStorage
    var account = sessionStorage.getItem('account');
    if (!account) {
        alert('Không tìm thấy thông tin tài khoản.');
        return;
    }
    // Chuyển đổi dữ liệu account từ JSON
    var user = JSON.parse(account);

    // Tạo đối tượng dữ liệu để gửi
    var data = {
        userId: user.userId,
        password: newPassword
    };

    // Gửi yêu cầu API thay đổi mật khẩu
    fetch('https://www.kitchenbuddy.somee.com/api/v1/authenticate/change-pass', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
            alert(result.message);
            window.location.href = 'homepage.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi đổi mật khẩu.');
    });
});