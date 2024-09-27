document.getElementById('submit-btn').addEventListener('click', function() {
    // Get the userId from sessionStorage
    /*var account = sessionStorage.getItem('account');
    var user = JSON.parse(account);
    var userId = user.customerId; */

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
        userId: 1,
        plans: plans
    };

    // Convert the object to JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Save JSON to a file and prompt user to download it
    download_json_file(jsonString, "meal_plan.json");
});

function download_json_file(json_data, file_name) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json_data));
    element.setAttribute('download', file_name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
