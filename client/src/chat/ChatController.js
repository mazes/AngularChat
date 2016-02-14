"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams, $http, $location, ChatResource){
	$scope.chatter = $routeParams.chattee;
	$scope.currentUser = $routeParams.username;
	$scope.currentRoom = ChatResource.getRoom();

	$scope.leaveChat = function leaveChat(){
		ChatResource.leaveChat($scope.chatter);
		$location.url("/roomlist/" + $routeParams.username);
	},

	$scope.sendMessage = function sendMessage(){
		var messageObj = {
			roomName: $routeParams.chattee,
			msg: $scope.message
		};
		ChatResource.sendMessage(messageObj);
	},

	$scope.getMessages = function getMessages(){

	}

}]);