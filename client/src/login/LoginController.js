"use strict";

angular.module("angularChat").controller("LoginController",
["$scope", "$location","ChatResource", "$routeParams", "loggedIn",
function login($scope, $location, ChatResource, $routeParams, loggedIn){
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
				$scope.errorMessage = "Username is taken!";
				$scope.inputForm.$setPristine();
			}
			else{
				ChatResource.setUser($scope.currentUser);
				loggedIn.logged = true;
				$location.url('/roomlist');
			}
		});
	};
}]);
