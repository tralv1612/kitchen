document.addEventListener('DOMContentLoaded', function() {
    // Lấy userId từ sessionStorage
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var userId = user.userId;

    // Gọi API để lấy dữ liệu kế hoạch bữa ăn đã lưu của người dùng
    fetch('https://www.kitchenbuddy.somee.com/api/v1/plans/' + userId, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data); // In ra dữ liệu API trả về để kiểm tra
        if (data && Array.isArray(data)) {
            fillMealPlanTable(data);
        } else {
            console.error('Dữ liệu không hợp lệ.');
        }
    })
    .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
    });
});

// Hàm để điền dữ liệu kế hoạch bữa ăn vào bảng
function fillMealPlanTable(data) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    // Duyệt qua từng kế hoạch bữa ăn trả về từ API
    data.forEach(plan => {
        const dayIndex = days.indexOf(plan.day);

        if (dayIndex !== -1) {
            // Tách chuỗi `content` bằng ký tự `$` để lấy bữa sáng, trưa, tối
            const mealContents = plan.content.split('$');

            // Duyệt qua các bữa ăn (Sáng, Trưa, Tối)
            mealContents.forEach((mealContent, mealIndex) => {
                if (mealIndex < meals.length) {
                    const inputSelector = `table tbody tr:nth-child(${dayIndex + 1}) td:nth-child(${mealIndex + 2}) input`;
                    document.querySelector(inputSelector).value = mealContent;
                }
            });
        }
    });
}




document.getElementById('submit-btn').addEventListener('click', function() {
    // Get the userId from sessionStorage
    var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var userId = user.userId;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    
    const plans = [];

    // Loop through days
    days.forEach((day, dayIndex) => {
        let mealContents = [];
        // Loop through meal times (Breakfast, Lunch, Dinner)
        meals.forEach((meal, mealIndex) => {
            const inputSelector = `table tbody tr:nth-child(${dayIndex + 1}) td:nth-child(${mealIndex + 2}) input`;
            const inputValue = document.querySelector(inputSelector).value;
            mealContents.push(inputValue);
        });

        // Only add a plan for the day if any meals are entered
        if (mealContents.some(content => content.trim() !== "")) {
            const contentString = mealContents.join('$');
            plans.push({
                day: day,
                content: contentString
            });
        }
    });

    // Construct the final JSON object
    const jsonData = {
        userId: userId,
        plans: plans
    };

    // Send the JSON data to the API using fetch (POST request)
    fetch('https://www.kitchenbuddy.somee.com/api/v1/plans/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Meal plan submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the meal plan.');
    });
});
