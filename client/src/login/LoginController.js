"use strict";

angular.module("angularChat").controller("LoginController",
["$scope", "$http", "$location","ChatResource",
function login($scope, $http, $location, ChatResource){
	$scope.user = "";
	$scope.pass = "xxx";
	$scope.errorMessage = "muu";
	var success;
	$scope.onLogin = function onLogin(){
		ChatResource.login($scope.user, $scope.pass, function(success){
			if(!success){
				$scope.errorMessage = "Login failed!";
				$scope.$apply();
			}
			else{
				$location.url('/roomlist/'+ $scope.user);
				$scope.$apply();
			}
		})
	};
}]);
