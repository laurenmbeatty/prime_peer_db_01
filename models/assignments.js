/**
 * Created by Dave on 10/7/15.
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;

var AssignmentsSchema = new Schema({
    assignment_number: Number,
    student_name: String,
    score: Number,
    date_completed: Date,
    id: Number
});

var Assignments = mongoose.model('Assignments', AssignmentsSchema);

//Get all assignments from database
router.get('/:id?', function(req, res, next){

    var id = req.params.id;

    if(id){
        Assignments.findOne({id: id}, function(err, Assignments){
            res.json(Assignments);
        });
    } else{
       Assignments.find({}, function(err, Assignments) {
           if (err) {
               console.log("get request", err);
           }
           res.json(Assignments);
   })
   }
});

//Add a new assignment to the database
router.post('/add', function(req, res, next){
    var assignment = new Assignment(req.body);
    assignment.save(function(err){
        if(err){
            console.log("Post", err);
            response.send("Cannot post data");
        }
    })
});




module.exports = Assignments;