
$(document).ready(function () {
    //profile form submittal
    // ids to variables











    // axios.get("https://trackapi.nutritionix.com/v2/search/instant?query=apple"
    // , {
    //     headers: {
    //     "x-app-id": "your id",
    //     "x-app-key":"your key"
    //     }}


    //food api
    var foodItem = "";
    var calorieCount = 0;


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
        $("#sendFoodToDb").show();
        });


    });

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






        // saveExample: function (example) {
        //     return $.ajax({
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         type: "POST",
        //         url: "api/examples",
        //         data: JSON.stringify(example)
        //     });
        // },
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







    var refreshExamples = function () {
        API.getExamples().then(function (data) {
            var $examples = data.map(function (example) {
                var $a = $("<a>")
                    .text(example.goal)
                    .attr("href", "/example/" + example.id);

                var $li = $("<li>")
                    .attr({
                        class: "list-group-item",
                        "data-id": example.id
                    })
                    .append($a);

                var $button = $("<button>")
                    .addClass("btn btn-danger float-right delete")
                    .text("Completed!");

                $li.append($button);
                return $li;

            });

            $updateBtn.empty();
            $updateBtn.append($examples);
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

        // if (!example.goal) {
        //   alert("You must enter a goal!");
        //   return;
        // }

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




    //LOGIN FUNCTION

    // var handleLogin = function (event) {
    //     event.preventDefault();

    //     var login = {
    //         email: $signInEmail.val().trim(),
    //         password: $signInPassword.val().trim()
    //     };

    //     // if (!example.goal) {
    //     //   alert("You must enter a goal!");
    //     //   return;
    //     // }

    //     API.userSignIn(login).then(function () {
    //         console.log("welcome ")
    //     });


    // };


    //SIGNIN FUNCTION

    // var handleSignup = function (event) {
    //     event.preventDefault();

    //     var signup = {
    //         email: $signUpEmail.val().trim(),
    //         password: $signUpPassword.val().trim(),
    //         verifyPassword: $signUpPasswordVerify.val().trim()

    //     };
    //     var login = {
    //         email: $signUpEmail.val().trim(),
    //         password: $signUpPassword.val().trim()
    //     };


    //     // if (!example.goal) {
    //     //   alert("You must enter a goal!");
    //     //   return;
    //     // }

    //     API.userSignUp(signup).then(function () {
    //         console.log("new user created");
    //         API.userSignIn(login).then(function () {
    //             console.log("welcome " + login.email);
    //         });
    //     });


    // };


    var handleFormSubmit = function (event) {
        event.preventDefault();

        var example = {
            goal: $exampleText.val().trim(),
            description: $exampleDescription.val().trim()
        };

        if (!example.goal) {
            alert("You must enter a goal!");
            return;
        }

        API.saveExample(example).then(function () {
            refreshExamples();
        });

        $exampleText.val("");
        $exampleDescription.val("");
    };

    var handleDeleteBtnClick = function () {
        var idToDelete = $(this)
            .parent()
            .attr("data-id");

        API.deleteExample(idToDelete).then(function () {
            refreshExamples();
        });
    };

    var handleUpdateBtnClick = function () {

        var idToUpdate = $(this);

        var newStatus = {
            status: idToUpdate
        };

        API.updateGoal(newStatus).then(function () {
            refreshExamples();
        });
    };

    // refreshExamples();



    $profileFormSubmit.on("click", handleProfileSubmit);

    //$viewProfileData.on("click", showProfileData);

    $("#ViewProfile").on("click", showProfileData);







});
