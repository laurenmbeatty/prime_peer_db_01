/**
 * Created by Dave on 10/7/15.
 */
var express = require('express');
var router = express.Router();
var Assignment = require("../models/assignments.js");
//Get all assignments from database
router.get('/:assignment_number?', function(req, res, next){

    var id = req.params.id;

    if(id){
        Assignment.findOne({id: id}, function(err, Assignment){
            res.json(Assignment);
        });
    } else{
        Assignment.find({}, function(err, Assignment) {
            if (err) {
                console.log("get request", err);
            }
            res.json(Assignment);
        })
    }
});

//Add a new assignment to the database
router.post('/add', function(req, res, next){
    var assignment = new Assignment(req.body);
    assignment.save(function(err){
        if(err){
            console.log("Post", err);
            res.send("Cannot post data");
        }
        console.log("SAVED!",assignment);
        res.send(200);
    })
});

router.delete('/remove/:id', function(req, res){
    var id = req.params.id;
    Assignment.findOne({id:id}, function(err, Assignment){
        if(err) {
            console.log("delete error");
            next(err);
        }else{
            Assignment.remove(function(err) {
                if (err) throw err;

            })
        }
    })
});

module.exports = router;