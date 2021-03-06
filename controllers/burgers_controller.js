var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        // Log all results of the SELECT statement
        res.render("index", hbsObject);
    });
  });

router.post("/api/burgers", function(req, res) {
    burger.insert(["burger_name", "devoured"], [req.body.newburger, req.body.isDevoured], function(data) {
        res.json({ id: data.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.update({
        devoured: req.body.devoured},
        condition, function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
              }
        });
    });

module.exports = router;
