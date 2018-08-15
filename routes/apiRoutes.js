var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Lifestyle.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Lifestyle.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/examples/:id", function(req, res) {
    db.Lifestyle.update({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Lifestyle.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });


  var db = require("../models");

  module.exports = function(app) {
    // Get all examples
  
  app.post("/api/username/profile/userinfo", function(req, res){
    db.Profile.create({
      name: req.body.name,
      age: req.body.name,
      weight: req.body.weight,
      calorieGoal: req.body.calorieGoal,
      calories: req.body.calories})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
  
  app.get("/api/username/profile/userinfo", function(req, res){
    db.Profile.findAll({where: {
      name: req.params.id
    }
  })
      .then(function(dbProfile) {
        res.json(dbProfile);
      });
  });
  
  app.post("/api/username/blog/post", function(req, res){
    db.Blog.create({
      name: req.body.name,
      title: req.body.title,
      message: req.body.message
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });
    
  app.get("/api/username/blog/post/:id", function(req, res){
    db.Blog.findAll({})
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });
  
  app.post("/api/username/lifestyle/goals", function(req, res){
    db.Lifestyle.create({
      goal: req.body.goal,
      description: req.body.description,
    })
      .then(function(dbLifestyle) {
        res.json(dbLifestyle);
      });
  });
    
  app.get("/api/username/lifestyle/goals", function(req, res){
    db.Lifestyle.findAll({})
      .then(function(dbLifestyle) {
        res.json(dbLifestyle);
      });
  });
  
  
  };
  


};
