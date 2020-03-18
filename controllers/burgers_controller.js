//Setting up the routes
const express = require("express");

const router = express.Router();

//Import the model (burger.js) to use its database functions
const burger = require("../models/burger.js");

router.get("/", function(req,res){
    burger.all(function(data){
        console.log(data);
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    console.log("POST", req.body)
    burger.create([
        "burger_name", "devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(result){
        //sending back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0) {
            //If no rows were changed,ID does not exist, send 404
            return res.status(404).end();
        } else {
          res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if (result.affectedRows == 0) {
            //If no rows are changed, ID doesn't exist, so throw 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//exports routes for the server.js to use
module.exports = router;