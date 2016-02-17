"use strict";

angular.module("angularChat").controller("LoginController",
["$scope", "$http", "$location","ChatResource", "$routeParams",
function login($scope, $http, $location, ChatResource, $routeParams){
	if($routeParams.disconnect !== undefined){
		ChatResource.disconnect();
	}else{
		$scope.currentUser = "";
	}
	$scope.pass = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin(){
		ChatResource.login($scope.currentUser, $scope.pass, function(success){
			if(!success){
				$scope.errorMessage = "Login failed!";
			}
			else{
				ChatResource.setUser($scope.currentUser);
				$location.url('/roomlist');
			}
		});
	};
}]);
