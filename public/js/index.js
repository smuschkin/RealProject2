var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $GoalList = $("#goal-list");
var $updateBtn = $("#to-do-list");

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

var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
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

$submitBtn.on("click", handleFormSubmit);
$updateBtn.on("click", ".delete", handleDeleteBtnClick);

