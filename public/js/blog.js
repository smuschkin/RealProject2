
// Get references to page elements
var $blogTitle = $("#new-blog-title");
var $blogTopic = $("#new-blog-topic");
var $blogDescription = $("#new-blog-description");
var $blogSubmitBtn = $("#new-blog-submit");
var $blogList = $("#blog-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBlog: function(blog) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/blog",
      data: JSON.stringify(blog)
    });
  },
  getBlogs: function() {
    return $.ajax({
      url: "api/blog",
      type: "GET"
    });
  },
  deleteBlog: function(id) {
    return $.ajax({
      url: "api/blog/" + id,
      type: "DELETE"
    });
  }
};

// refreshBlogs gets new blogs from the db and repopulates the list
var refreshBlogs = function() {
  API.getBlogs().then(function(data) {
    var $blogs = data.map(function(blog) {
      var $a = $("<a>")
        .text(blog.title)
        .attr("href", "/blog/" + blog.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": blog.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $blogList.empty();
    $blogList.append($blogs);
  });
};

// handleFormSubmit is called whenever we submit a new blog
// Save the new blog to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var blog = {
    title: $blogTitle.val().trim(),
    topic: $blogTopic.val(),
    description: $blogDescription.val().trim()
  };

  
  if (!(blog.title && blog.description)) {
    alert("You must enter a title and description!");
    return;
  }
  

  API.saveBlog(blog).then(function() {
    refreshBlogs();
  });

  $blogTitle.val("");
  $blogTopic.val("");
  $blogDescription.val("");
};

// handleDeleteBtnClick is called when a blog's delete button is clicked
// Remove the blog from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBlog(idToDelete).then(function() {
    refreshBlogs();
  });
};

// Add event listeners to the submit and delete buttons
$blogSubmitBtn.on("click", handleFormSubmit);
$blogList.on("click", ".delete", handleDeleteBtnClick);


$("div.card .card-header").on("click", function () {

  if ($(this).hasClass("hidecontent")) {
      $(this).removeClass("hidecontent");
      $(this).next().show(1000);
  } else {
      $(this).addClass("hidecontent");
      $(this).next().hide(1000);
  }

})