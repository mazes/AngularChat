"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams, $http, $location, ChatResource){
	$scope.chat = [];
	$scope.chatter = $routeParams.chattee;
	$scope.currentUser = $routeParams.username;

	$scope.leaveChat = function leaveChat(){
		ChatResource.leaveChat($scope.chatter);
		$location.url("/roomlist/" + $routeParams.username);
	}

	$scope.sendPrivateMessage = function sendPrivateMessage(user){
		console.log("inside ", $scope.message, user);
		$scope.privateMessage = {
			nick: user,
			message: $scope.message
		}
		ChatResource.sendPrivateMessage($scope.privateMessage, function(success){
			if(!success){
				console.log("Did not work");
			}else{
				console.log("worked")
			}
		});
	}
}]);