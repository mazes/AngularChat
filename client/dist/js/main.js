(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module("angularChat", ["ui.bootstrap", "ngRoute", "ngAnimate", "ui-notification", "hSweetAlert"])

    .value('loggedIn', {
        logged: false
    })

    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
                templateUrl: "app/components/login/login.html",
                controller: "LoginController"
            }).when("/roomlist", {
            	templateUrl: "app/components/roomlist/roomlist.html",
            	controller: "RoomListController"
            }).when("/createroom", {
                templateUrl: "app/components/createroom/createroom.html",
                controller: "CreateRoomController"
            }).when("/chat/:room", {
                templateUrl: "app/components/chat/chat.html",
                controller: "ChatController"
            }).when("/chat/private/:chattee", {
                templateUrl: "app/components/privatechat/privateChat.html",
                controller: "PrivateChatController"
            }).when("/unreadpms/", {
                templateUrl: "app/components/inbox/inbox.html",
                controller: "InboxController"
            }).otherwise("/", {
                templateUrl: "app/components/login/login.html",
                controller: "LoginController"
            });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
        }])

    .directive('autofocus', ['$timeout',
        function ($timeout) {
          return {
            restrict: 'A',
            link: function ($scope, $element) {
              $timeout(function () {
                $element[0].focus();
              });
            }
          };
        }
    ]);

},{}]},{},[1]);
