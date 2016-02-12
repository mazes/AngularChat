"use strict";

angular.module("angularChat").controller("LoginController",
["$scope", "$http", "$location","ChatResource",
function LoginController($scope, $http, $location, ChatResource){
	$scope.user = "";
	$scope.pass = "";
	$scope.onLogin = function onLogin(){
		ChatResource.login($scope.user, $scope.pass, function(success){
			if(!success){
				$scope.errorMessage = "Login failed!";
			}
			else{
				$location("#/roomlist");
			}
		});
	}
}]);
