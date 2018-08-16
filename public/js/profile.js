$(document).ready(function () {

    //profile form submittal
    // ids to variables
    var $profileName = $("#profileName");
    var $profileAge = $("#profileAge");
    var $profileWeight = $("#profileWeight");
    var $profileCalorieGoal = $("#profileCalorieGoal");
    var $profileCalorieGoalAmount = $("#profileCalorieGoalAmount");

    //profile form submit button
    var $profileFormSubmit = $("#profileFormSubmit");


    // var $exampleText = $("#example-text");
    // var $exampleDescription = $("#example-description");
    // var $submitBtn = $("#submit");
    // var $GoalList = $("#goal-list");
    // var $updateBtn = $("#to-do-list");

    // //login 
    // var $signInEmail = $("#loginEmail");
    // var $signInPassword = $("#loginPassword");
    // var $signInButton = $("#loginSubmitForm");

    //signup
    var $signUpEmail = $("#signUpEmail");
    var $signUpPassword = $("#signUpPassword");
    var $signUpPasswordVerify = $("#signUpPasswordVerify");
    var $signUpButton = $("#signUpSubmitForm");



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

    // var refreshExamples = function () {
    //     API.getExamples().then(function (data) {
    //         var $examples = data.map(function (example) {
    //             var $a = $("<a>")
    //                 .text(example.goal)
    //                 .attr("href", "/example/" + example.id);

    //             var $li = $("<li>")
    //                 .attr({
    //                     class: "list-group-item",
    //                     "data-id": example.id
    //                 })
    //                 .append($a);

    //             var $button = $("<button>")
    //                 .addClass("btn btn-danger float-right delete")
    //                 .text("Completed!");

    //             $li.append($button);
    //             return $li;

    //         });

    //         $updateBtn.empty();
    //         $updateBtn.append($examples);
    //     });
    // };


    

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
            console.log(userData);
        });


    };



    //LOGIN FUNCTION

    var handleLogin = function (event) {
        event.preventDefault();

        var login = {
            email: $signInEmail.val().trim(),
            password: $signInPassword.val().trim()
        };

        // if (!example.goal) {
        //   alert("You must enter a goal!");
        //   return;
        // }

        API.userSignIn(login).then(function () {
            console.log("welcome ")
        });


    };


    //SIGNIN FUNCTION

    var handleSignup = function (event) {
        event.preventDefault();

        var signup = {
            email: $signUpEmail.val().trim(),
            password: $signUpPassword.val().trim(),
            verifyPassword: $signUpPasswordVerify.val().trim()

        };
        var login = {
            email: $signUpEmail.val().trim(),
            password: $signUpPassword.val().trim()
        };


        // if (!example.goal) {
        //   alert("You must enter a goal!");
        //   return;
        // }

        API.userSignUp(signup).then(function () {
            console.log("new user created");
            API.userSignIn(login).then(function () {
                console.log("welcome " + login.email);
            });
        });


    };


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




});
