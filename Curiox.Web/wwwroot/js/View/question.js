﻿$(document).ready(function () {
    // check author of question
    let listAnswers = $('.page-header');
    listAnswers = listAnswers.slice(1);
    for (let item of listAnswers) {
        let author = $(item).find('.answer-author').html();
        // Toan's code: fix bug triming undefined
        if (author) {
            author = author.trim();
        }



        let thisUser = JSON.parse(localStorage.getItem('user'));
        if (thisUser != author) {
            $(item).find('.btn-edit-answer').remove();
            $(item).find('.btn-delete-answer').remove();
        }
    }

    // check liked question
    let likedAnswers = $("[answer-liked='1']");
    for (let likedAnswer of likedAnswers) {
        $(likedAnswer).parents('.page-header').first().find('.btn-upvote').addClass('upvoted');
    }

    //handle add answer
    $(document).on('click', '#btnSubmit', function () {
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
            let questionId = window.location.pathname.slice(-2);
            let content = $("#contentAnswer").val();
            var jsonObj = {
                "token": localStorage.getItem('token'),
                "content": content,
                "question_id": questionId
            };
            $.ajax({
                method: "POST",
                url: Curiox.Config.loginUrl + "/Api/Answer",
                contentType: "application/json",
                data: JSON.stringify(jsonObj),
                success: function (data, txtStatus, xhr) {
                    if (txtStatus === "success") {
                        CommonJS.showSuccessMsg("Add answer successfully!");
                    }
                    window.location.href = '/Home/Question/' + questionId;
                },
                error: function () {
                    CommonJS.showFailMsg("An error occured! Please try again!");
                    window.location.href = '/Home/Question/' + questionId;
                }
            });
        } else {
            //verify if already logged in
            CommonJS.showFailMsg('You must logged in first!');
            window.location.href = '/Home/Login';
        }
    });

    //handle event click btn-upvote
    $('.btn-upvote').on('click', function () {
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
            let answerId = $(this).parents('.page-header').first().find('.anwser-content').attr('answer-id');
            var jsonObj = {
                "token": localStorage.getItem('token'),
            };
            let thisUpvote = $(this).find('.nbUpvote');
            $.ajax({
                method: "POST",
                url: Curiox.Config.loginUrl + "/Api/Answer/Upvote?answerId=" + answerId,
                contentType: "application/json",
                data: JSON.stringify(jsonObj),
                success: function (data, txtStatus, xhr) {
                    debugger
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
        } else {
            //verify if already logged in
            CommonJS.showFailMsg('You must logged in first!');
            window.location.href = '/Home/Login';
        }
        
    });

    //handle event click btn-edit-answer
    $('.btn-edit-answer').on('click', function (e) {
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
            let content = $(this).parents('.page-header').first().find('.anwser-content').html().trim();
            let answerId = $(this).parents('.page-header').first().find('.anwser-content').attr('answer-id');
            let html = '<textarea rows=4 answer-id="' + answerId + '"class="anwser-input" value="'
                + content
                + '">' + content + '</textarea >'
                + '<button type="button" id="btnSubmitEditAnswer" class="btn btn-primary btnSubmitEdit">Submit</button>';
            e.preventDefault();
            $(this).parents('.page-header').first().find('.anwser-content').html(html);
            e.preventDefault();
        } else {
            //verify if already logged in
            CommonJS.showFailMsg('You must logged in first!');
            window.location.href = '/Home/Login';
        }

    });

    // handle submit edit answer
    $(document).on('click', '#btnSubmitEditAnswer', function () {
            let answerId = $(".anwser-input").attr('answer-id');
            let content = $(".anwser-input").val();
            var jsonObj = {
                "token": localStorage.getItem('token'),
                "content": content,
        };
        debugger
            $.ajax({
                method: "PUT",
                url: Curiox.Config.loginUrl + "/Api/Answer?answerId=" + answerId,
                contentType: "application/json",
                data: JSON.stringify(jsonObj),
                success: function (data, txtStatus, xhr) {
                    if (txtStatus === "success") {
                        CommonJS.showSuccessMsg("Edit answer successfully!");
                    }
                    location.reload();
                },
                error: function () {
                    CommonJS.showFailMsg("An error occured! Please try again!");
                    location.reload();
                }
            });
    });
    // blur input
    $(document).on('blur', '.anwser-input', function () {
        
    });

    //handle event click btn-delete-answer
    $('.btn-delete-answer').on('click', function (e) {
        if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
            let idAnswer = $(this).parents('.page-header').find('.anwser-content').attr('answer-id');
            e.preventDefault();
            $('#confirm-box').data('id', idAnswer).dialog('open');
            //e.preventDefault();
        } else {
            //verify if already logged in
            CommonJS.showFailMsg('You must logged in first!');
            window.location.href = '/Home/Login';
        }

    });
});