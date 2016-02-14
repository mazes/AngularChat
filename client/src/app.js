"use strict";
var socket = io.connect("http://localhost:8080");
angular.module("angularChat", ["ui.bootstrap", "ngRoute"]);
angular.module("angularChat").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        }).when("/roomlist", {
        	templateUrl: "roomlist/roomlist.html",
        	controller: "RoomListController"
        }).when("/createroom", {
            templateUrl: "createroom/createroom.html",
            controller: "CreateRoomController"

        }).when("/chat", {
            templateUrl: "chat/chat.html",
            controller: "ChatController"
        }).otherwise("/login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        });
}]);
