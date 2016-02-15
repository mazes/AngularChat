"use strict";
var socket = io.connect("http://localhost:8080");
angular.module("angularChat", ["ui.bootstrap", "ngRoute"]);
angular.module("angularChat").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        }).when("/roomlist", {
        	templateUrl: "roomlist/roomlist.html",
        	controller: "RoomListController"
        }).when("/createroom", {
            templateUrl: "createroom/createroom.html",
            controller: "CreateRoomController"
        }).when("/chat/:room", {
            templateUrl: "chat/chat.html",
            controller: "ChatController"
        }).when("/chat/private/:chattee", {
            templateUrl: "privatechat/privateChat.html",
            controller: "PrivateChatController"
        }).otherwise("/login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        });
}]);
