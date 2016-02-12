"use strict";

angular.module("angularChat", ["ui.bootstrap", "ngRoute"]);
angular.module("angularChat").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        }).when("/roomlist", {
        	templateUrl: "roomlist/roomlist.html",
        	controller: "RoomListController"
        });
}]);
