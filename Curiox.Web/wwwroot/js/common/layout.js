﻿$(document).ready(function () {
    //check if already logged in
    //if logged in
    if (false) {
        let html = ''
            + '<li><a href="#"><span class="glyphicon glyphicon-user"></span>' + ' Nguyen Thanh' + '</a></li>'
            + '<button id="btnAddQuestion" class="btn btn-danger navbar-btn">Add Question</button>'
            + '';
        $('#user-box').html(html);
    } else {
        let html = ''
            + '<li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>'
            + '<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>'
            + '<button id="btnAddQuestion" class="btn btn-danger navbar-btn">Add Question</button>'
            + '';
        $('#user-box').html(html);
    }

    $('#btnAddQuestion').on('click', function () {
        if (false) {
            //verify if already logged in
            alert('You must log in first!');
            window.location.href = '/Home/About';
        } else {
            $('#question-box').dialog('open');
        }
    });
});