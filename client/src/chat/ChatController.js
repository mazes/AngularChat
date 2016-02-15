"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route){
	$scope.roomName = $routeParams.room;
	$scope.currentUser = ChatResource.getUser();
	$scope.currentRoom = ChatResource.getRoom();
	$scope.chat = $scope.currentRoom.messageHistory;
	$scope.users = $scope.currentRoom.users;

	//listen for message updates
	socket.on("updatechat", function(data, messages){
			$scope.chat = messages;
			$scope.$apply();
	});	

	socket.on("updateusers", function(data, users, b){
		$scope.users = users;
		$scope.$apply();
		console.log("scopeusers: " ,$scope.users);
	});

	$scope.leaveChat = function leaveChat(){
		ChatResource.leaveChat($scope.roomName);
		$location.url("/roomlist");
	},

	$scope.sendMessage = function sendMessage(){
		var messageObj = {
			roomName: $scope.roomName,
			msg: $scope.message
		};
		ChatResource.sendMessage(messageObj);
	},

	$scope.getMessages = function getMessages(){
		$scope.currentRoom = ChatResource.getRoom();
	},

	$scope.sendPrivateMessage = function sendPrivateMessage(user){
		console.log("inside ", $scope.message, user);
		$scope.privateMessage = {
			nick: user,
			message: $scope.message
		};
		ChatResource.sendPrivateMessage($scope.privateMessage, function(success){
			if(!success){
				console.log("Did not work");
			}else{
				console.log("worked");
			}
		});
	}
}]);