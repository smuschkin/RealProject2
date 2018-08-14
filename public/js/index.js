// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $GoalList = $("#goal-list");
var $updateBtn = $("#update-button");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
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
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      // var $a2 = $("<a>")
      //   .text(example.text)
      //   .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      // var $li2 = $("<li>")
      //   .attr({
      //     class: "list-group-item",
      //     "data-id": example.id
      //   })
      //   .append($a2);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Delete!");

      // var $updateBtn = $("<button>")
      //   .addClass("btn btn-danger float-right")
      //   .text("Complete!");

      $li.append($button);
      return $li;

      // $li2.append($updateBtn);
    });

    $GoalList.empty();
    $GoalList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!example.text) {
    alert("You must enter a goal!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};
// MOVE TO COMPLETED
var handleUpdateBtnClick = function () {
  // var id = $(this).data("data-id");
  var idToUpdate = $(this);

  var newStatus = {
    status: idToUpdate
  };

  API.updateGoal(newStatus).then(function () {
    refreshExamples();
  });
};
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$GoalList.on("click", ".delete", handleDeleteBtnClick);
$updateBtn.on("click", handleUpdateBtnClick);

