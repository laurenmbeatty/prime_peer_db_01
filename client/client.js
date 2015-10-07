/**
 * Created by Dave on 10/7/15.
 */
$(function () {

    $(".assignmentForm").submit(function (event) {
        event.preventDefault();
        var formData = $(".assignmentForm").serialize();
        $.ajax({
            type: "POST",
            url: "/assignments/add",
            data: formData
        }).done(function (response) {
            console.log('Success!');
            getData();
        })
        $("input[type=text], input[type=number]").val("");
    });
    var studentAmount = 0;

    function getData() {
        console.log("fired");
        $.ajax({
            type: "GET",
            url: "/assignments"
        }).done(function (response) {

            if (studentAmount != response.length) {
                $(".studentInfo").remove();
                studentAmount = 0;
                for (var i = 0; i < response.length; i++) {
                    var $appendMessage = $("<div class ='studentInfo'><ul><li>Student Name: " + response[i].student_name + "</li><li class='studentID' id = '" + response[i].id + "'>Student ID: " + response[i].id + "</li>" +
                        "<li>Assignment Number: " + response[i].assignment_number + "</li><li>Student Score: " + response[i].score + "</li><li>Date Completed: " + response[i].date_completed + "</li></ul>" +
                        "<button class='remove'>Remove Record</button></div>");
                    $(".appendHere").append($appendMessage);
                    increment();

                }
            }
            console.log(studentAmount);
        });
    }

    function increment() {
        studentAmount++;
    }

    setInterval(getData, 5000);
    $(document).on("click", ".remove", function(){
        console.log("yes!");

        var currentID = $(this).parent().children("ul").children(".studentID").attr("id");
        $.ajax({
            type: "DELETE",
            url: "/assignments/remove/" + currentID
        }).done(function(response){
            console.log("deleted");
        })
        $(this).parent().remove();
    })
});