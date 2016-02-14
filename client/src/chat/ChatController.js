"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams, $http, $location, ChatResource){
	$scope.chatter = $routeParams.room;
	$scope.currentUser = ChatResource.getUser();
	$scope.currentRoom = ChatResource.getRoom();

	$scope.leaveChat = function leaveChat(){
		ChatResource.leaveChat($scope.chatter);
		$location.url("/roomlist");
	},

	$scope.sendMessage = function sendMessage(){
		var messageObj = {
			roomName: $routeParams.chattee,
			msg: $scope.message
		};
		ChatResource.sendMessage(messageObj);
	},

	$scope.getMessages = function getMessages(){

	},

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
	};
}]);