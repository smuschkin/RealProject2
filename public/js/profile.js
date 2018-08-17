
$(document).ready(function () {


    //food api
    var foodItem = "";
    var calorieCount = 0;




    var $mealName = $("#foodInput");
    var totalDailyCal = 0;
    var $mealTime = "";


    //meal submit
    var $submitMeal = $("#sendFoodToDb");
    // show mealInfo before submit
    var $displayDailyCals = $("#dailySummaryTotalCal");


    //end meal data / api



    var $profileName = $("#profileName");
    var $profileAge = $("#profileAge");
    var $profileWeight = $("#profileWeight");
    var $profileCalorieGoal = $("#profileCalorieGoal");
    var $profileCalorieGoalAmount = $("#profileCalorieGoalAmount");

    var $viewProfileName = $("#viewProfileName");
    var $viewProfileAge = $("#viewProfileAge");
    var $viewProfileWeight = $("#viewProfileWeight");
    var $viewProfileCalorieGoal = $("viewProfileCalorieGoal");
    var $viewProfileCalorieGoalAmount = $("#viewProfileCaloriesAmount");


    //profile form submit button
    var $profileFormSubmit = $("#profileFormSubmit");
    var $viewProfileData = $("#viewProfileData");
    var info = [];

    $("#sendFoodToDb").hide();


    $("#submitFood").on("click", function () {
        event.preventDefault();

        var food = $("#foodInput").val().trim();
        var foodQuery = "https://trackapi.nutritionix.com/v2/search/instant?query=" + food;
        var settings = {
            async: true,
            crossDomain: true,
            url: foodQuery,
            method: "GET",
            headers: {

                "x-app-id": "6a2a1644",
                "x-app-key": "299235876ad8df154fe7505413d8548b",

            }
        };



        $.ajax(settings).then(function (response) {
            console.log(response.branded[0]);
            console.log(response.branded[0].nf_calories);
            foodItem = food;
            calorieCount = response.branded[0].nf_calories;

            console.log(foodItem + " " + calorieCount);
            $mealTime = $('input[name="mealTime"]:checked').val();
            $("#showMealName").text("What you ate: " + foodItem);
            $("#showCalAmount").text("Caloires: " + calorieCount);
            $("#sendFoodToDb").show();
            $("#submitFood").hide();

        });


    });


    //     $("#sendFoodToDb").on("click", function () {

    // console.log("hello");
    // mealData =

    //     });


    var API = {
        saveProfileData: function (userInfo) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "/api/username/profile/userinfo",
                data: JSON.stringify(userInfo)
            });
        },

        getProfileData: function () {
            return $.ajax({

                url: "/api/username/profile/userinfo/",
                type: "GET"
            });
        },

        saveMealData: function (data) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "/api/username/meal",
                data: JSON.stringify(data)
            });
        },
      

        displayDailyCalTotal: function () {
            return $.ajax({

                url: "/api/username/meal",
                type: "GET"
            });
        },


        getExamples: function () {
            return $.ajax({
                url: "api/examples",
                type: "GET"
            });
        },
        updateGoal: function () {
            return $.ajax({
                url: "api/examples",
                type: "PUT",
                data: newStatus
            });
        },

        deleteExample: function (id) {
            return $.ajax({
                url: "api/examples/" + id,
                type: "DELETE"
            });
        },

        //users
        userSignIn: function (user) {
            return $.ajax({

                url: "api/signin",
                type: "GET"

            });
        },
        userSignUp: function (newUser) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/signup",
                data: JSON.stringify(newUser)
            });
        },
    };



    var handleMealSubmit = function (event) {

        event.preventDefault();

        var mealData = {
            mealtime: $mealTime,
            food: $mealName.val().trim(),
            calorieCount: calorieCount,
            dayCount: totalDailyCal + calorieCount


        };



        API.saveMealData(mealData).then(function () {
            $("#sendFoodToDb").hide();
            $("#submitFood").show();



            // insertUserData(userData);
        });


    };

    var showTotalCalAmt = function () {
        event.preventDefault();

        console.log('samsawan HELLO EHELLO');

        API.displayDailyCalTotal().then(function (data) {
            console.log(data);
            var foodData = {
                totalDailyCal: data[0].dayCount


            }


            console.log(foodData.totalDailyCal);
            totalDailyCal = foodData.totalDailyCal;
            console.log(totalDailyCal);
            $("#dailySummaryTotalCal").text(totalDailyCal);

        });

    };


    var displayCals = function () {

        console.log('samsawan HELLO EHELLO');

        API.displayDailyCalTotal().then(function (data) {
            console.log(data);
            var foodData = {
                totalDailyCal: data[0].dayCount


            }


            totalDailyCal = foodData.totalDailyCal;
            $("#dailySummaryTotalCal").text(totalDailyCal);
        });

    };


    var showProfileData = function () {
        event.preventDefault();

        console.log('samsawan HELLO EHELLO')

        API.getProfileData().then(function (data) {
            console.log(data);
            var userData = {
                name: data.name,
                age: data.age,
                weight: data.weight,
                calorieGoal: data.calorieGoal,
                calories: data.calories
            }
            insertUserData(userData);
        });
    }




    var handleProfileSubmit = function (event) {
        event.preventDefault();

        var userData = {
            name: $profileName.val().trim(),
            age: $profileAge.val().trim(),
            weight: $profileWeight.val().trim(),
            calorieGoal: $profileCalorieGoal.val().trim(),
            calories: $profileCalorieGoalAmount.val().trim(),


        };



        API.saveProfileData(userData).then(function () {
            insertUserData(userData);
        });


    };

    function insertUserData(data) {
        $viewProfileName.text(data.name);
        $viewProfileAge.text(data.age);
        $viewProfileWeight.text(data.weight);
        $viewProfileCalorieGoal.text(data.calorieGoal);
        console.log(data.calorieGoal);
        $viewProfileCalorieGoalAmount.text(data.calories);


    };


    // function insertUserData(data) {
    //     $viewProfileName.text(data.name);
      


    // };









    $profileFormSubmit.on("click", handleProfileSubmit);

    //$viewProfileData.on("click", showProfileData);

    $("#ViewProfile").on("click", showProfileData);

    $submitMeal.on("click", handleMealSubmit);

    $("#submitFood").on("click", showTotalCalAmt);
    displayCals();
$(".closeFoodModal").on("click",displayCals);

});
