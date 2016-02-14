"use strict";

angular.module("angularChat").controller("LoginController",
["$scope", "$http", "$location","ChatResource",
function login($scope, $http, $location, ChatResource){
	$scope.currentUser = "";
	$scope.pass = "";
	$scope.errorMessage = "";
	var success;
	$scope.onLogin = function onLogin(){
		ChatResource.login($scope.currentUser, $scope.pass, function(success){
			if(!success){
				$scope.errorMessage = "Login failed!";
				$scope.$apply();
			}
			else{
				ChatResource.setUser($scope.currentUser);
				$location.url('/roomlist');
				$scope.$apply();
			}
		})
	};
}]);
