document.getElementById("recipes").addEventListener("click", function() {
    window.location.href = "../pages/recipes.html";
});

document.getElementById("about-us").addEventListener("click", function() {
    window.location.href = "../pages/homepage.html";
});

document.getElementById("for-you").addEventListener("click", function() {
    window.location.href = "../pages/for_you.html";
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

document.getElementById('calculate-btn').addEventListener('click', function() {
    // Lấy giá trị chiều cao và cân nặng
    const height = parseFloat(document.getElementById('height').value) / 100; // chuyển cm sang mét
    const weight = parseFloat(document.getElementById('weight').value);

    // Kiểm tra giá trị hợp lệ
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('bmi-result').innerHTML = "<p>Please enter valid height and weight.</p>";
        return;
    }

    // Tính chỉ số BMI
    const bmi = (weight / (height * height)).toFixed(2);

    // Phân loại mức độ dựa trên BMI và cung cấp lời khuyên
    let category = '';
    let dietAdvice = '';
    let exerciseAdvice = '';
    let lifestyleAdvice = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        dietAdvice = 'Increase calorie intake with healthy foods such as nuts, whole grains, and protein-rich foods.';
        exerciseAdvice = 'Focus on strength training to build muscle mass.';
        lifestyleAdvice = 'Ensure you are getting enough rest and managing stress levels.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
        dietAdvice = 'Maintain a balanced diet with a variety of fruits, vegetables, and lean proteins.';
        exerciseAdvice = 'Keep up regular physical activities such as cardio and strength training.';
        lifestyleAdvice = 'Continue with good habits, like sufficient sleep and stress management.';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        dietAdvice = 'Reduce intake of sugary and high-fat foods, increase fiber-rich foods.';
        exerciseAdvice = 'Incorporate more cardio workouts, like jogging or cycling, into your routine.';
        lifestyleAdvice = 'Focus on reducing stress and practicing healthy eating habits.';
    } else {
        category = 'Obesity';
        dietAdvice = 'Adopt a low-calorie, nutrient-dense diet with vegetables, fruits, and whole grains.';
        exerciseAdvice = 'Start with low-impact exercises like walking, and gradually increase intensity.';
        lifestyleAdvice = 'Develop a consistent routine for better sleep and reduce sedentary behaviors.';
    }

    // Hiển thị kết quả BMI và lời khuyên
    document.getElementById('bmi-result').innerHTML = `
        <div class="result-display">
            <p>Your BMI: ${bmi}</p>
            <p>Your BMI indicates that you are at the level of ${category}</p>
            <p>Advice:</p>
            <ul>
                <li>Diet: ${dietAdvice}</li>
                <li>Exercise: ${exerciseAdvice}</li>
                <li>Lifestyle habits: ${lifestyleAdvice}</li>
            </ul>
        </div>
    `;
});

document.getElementById("button-forum").addEventListener("click", function() {
    window.location.href = "../pages/forum.html";
});