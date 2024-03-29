﻿$(document).ready(function () {
    if (window.location.pathname === '/') {
        localStorage.removeItem('activeCategory');
    }

    // handle What is your link?
    $(document).on('click', '#yourLink', function () {
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
            $('#question-box').dialog('open');
        } else {
            //verify if already logged in
            CommonJS.showFailMsg('You must logged in first!');
            window.location.href = '/Home/Login';
        }
    });

    // check liked question
    let likedQuestions = $("[question-liked='1']");
    for (let likedQuestion of likedQuestions) {
        $(likedQuestion).parents('.news-main-item').find('.btn-upvote').addClass('upvoted');
    }
    
    //handle event click btn-answer
    $('.btn-answer').on('click', function () {
        window.location.href = "/Home/Question";
    });

    //handle event click btn-upvote
    $('.btn-upvote').on('click', function () {
        let questionId = $(this).parents('.news-main-item').find('.question-title').attr('question-id');
        var jsonObj = {
            "token": localStorage.getItem('token'),
        };
        let thisUpvote = $(this).find('.nbUpvote');
        $.ajax({
            method: "POST",
            url: Curiox.Config.loginUrl + "/Api/Question/Upvote?questionId=" + questionId,
            contentType: "application/json",
            data: JSON.stringify(jsonObj),
            success: function (data, txtStatus, xhr) {
                if (txtStatus === "success") {
                    if (xhr.status == 201) {    //like
                        let nbUpvote = parseInt(thisUpvote.html());
                        thisUpvote.html(++nbUpvote);
                        thisUpvote.parents('.btn-upvote').addClass('upvoted');
                    } else if (xhr.status == 200) { //unlike
                        let nbUpvote = parseInt(thisUpvote.html());
                        thisUpvote.html(--nbUpvote);
                        thisUpvote.parents('.btn-upvote').removeClass('upvoted');
                    }
                }
            },
            error: function () {
                CommonJS.showFailMsg("An error occured! Please try again!");
            }
        });
    });

    if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
        let user = JSON.parse(localStorage.getItem('user'));
        $('#username').html(user);
    } else {
        $('#username').html('');
    }
});