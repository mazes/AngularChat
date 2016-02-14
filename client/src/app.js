"use strict";
var socket = io.connect("http://localhost:8080");
angular.module("angularChat", ["ui.bootstrap", "ngRoute"]);
angular.module("angularChat").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        }).when("/roomlist/:username", {
        	templateUrl: "roomlist/roomlist.html",
        	controller: "RoomListController"
        }).when("/createroom/:username", {
            templateUrl: "createroom/createroom.html",
            controller: "CreateRoomController"
        }).when("/chat/:username/:chattee", {
            templateUrl: "chat/chat.html",
            controller: "ChatController"
        }).when("/chat/private/:username/:chattee", {
            templateUrl: "chat/privateChat.html",
            controller: "ChatController"
        }).otherwise("/login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        });
}]);
