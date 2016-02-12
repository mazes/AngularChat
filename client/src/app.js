'use strict'

var app = angular.module("angularChat", ["ui.bootstrap", "ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        $.when("login", {
            templateUrl: "login/login.html",
            controller: "LoginController"
        });

}])
