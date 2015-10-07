/**
 * Created by Dave on 10/7/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentsSchema = new Schema({
    assignment_number: Number,
    student_name: String,
    score: String,
    date_completed: Date,
    id: Number
});

assignmentsSchema.pre('save', function(next){
    var currentDate = new Date();
    this.date_completed = currentDate;

    next();
});

var Assignment = mongoose.model('Assignment', assignmentsSchema);

module.exports = Assignment;