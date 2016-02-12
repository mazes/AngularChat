"use strict";

angular.module("angularChat").controller("LoginController",[
function LoginController($scope, ChatResource){
	console.log("inside logincontreller");
	$scope.user = "Raggi";
	$scope.pass = "R56";
	$scope.onLogin = function onLogin(){
		ChatResource.login($scope.user, $scope.pass, function(success){
			if(!success){
				$scope.errorMessage = "Login failed!";
			}
			else{
				//:Todo send user to roomlist
			}
		});
	}
}]);
