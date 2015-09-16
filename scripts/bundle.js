(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

    var $chat = $('#chat');
    var $logon = $('#logon');
    var $message = $('#message');
    var $chatWindow = $('#chat-window');
    var $username = $('#username');

    var userID = undefined;
    var serverURL = 'http://tiyfe.herokuapp.com/collections/josiah';

    $logon.submit(function (e) {
        e.preventDefault();
        $chat.show();
        $logon.hide();
        if ($username.val() === undefined) {
            userID = 'GUEST';
        } else {
            userID = $username.val();
        }
    });

    $.get(serverURL, function (record) {
        record.forEach(function (record) {
            $chatWindow.prepend('<div class="user">' + record.user + '</div>' + '<div class="post">' + record.message + '</div>' + '<div class="time">' + record.timestamp + '</div>');
            $('.test').scrollTop($chatWindow.height() + 100);
        });
    }, 'json');

    $chat.submit(function (e) {
        e.preventDefault();
        var newMsg = $message.val();
        var timeStamp = new Date();
        console.log('sent');
        $.post(serverURL, {
            user: userID,
            message: newMsg,
            timestamp: timeStamp
        }, function (response) {
            $chatWindow.append('<div class="user">' + response.user + '</div>' + '<div class="post">' + response.message + '</div>' + '<div class="time">' + response.timestamp + '</div>');
            $('.test').scrollTop($chatWindow.height() + 100);
        }, 'json');
        newMsg = $message.val('');
    });

    setInterval(function () {
        $.get(serverURL, function (record) {
            var origHeight = $chatWindow.height();
            $chatWindow.html('');
            record.forEach(function (record) {
                $chatWindow.prepend('<div class="user">' + record.user + '</div>' + '<div class="post">' + record.message + '</div>' + '<div class="time">' + record.timestamp + '</div>');
            });
            if (origHeight !== $chatWindow.height()) {
                $('.test').scrollTop($chatWindow.height() + 100);
            }
        }, 'json');
    }, 1000);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map