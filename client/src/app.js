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

        }).when("/chat/:currentUser/:username", {
            templateUrl: "chat/chat.html",
            controller: "ChatController"
        });
}]);
