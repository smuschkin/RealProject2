var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/goal/:id", function (req, res) {
    db.Lifestyle.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("goal", {
        lifestyle: dbExample
      });
    });
  });

  app.get("/blog", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("blog", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/lifestyle", function (req, res) {
    db.Lifestyle.findAll({}).then(function (dbLifestyle) {
      res.render("lifestyle", {
        msg: "Welcome!",
        examples: dbLifestyle
      });
    });
  });

  app.get("/profile", function (req, res) {
    db.Example.findAll({}).then(function (dbProfileGet) {
      res.render("profile", {
        msg: "Welcome!",
        userData: dbProfileGet
      });
    });
  });

  //standings
  app.get("/standings", function (req, res) {
    db.Profile.findAll({}).then(function (dbProfiles) {
      res.render("standings", {
        profiles: dbProfiles
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
