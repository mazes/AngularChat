"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();
	
	socket.on("recv_privatemsg", function(user, message){
		console.log("private message rec");
		var pmessage = {
			receiver: $scope.chattee,
			sender: user,
			message: message
		};
		ChatResource.addpMessage(pmessage);
		$scope.chat = $scope.getMessages();
	});

	$scope.sendPrivateMessage = function sendPrivateMessage(user){
		console.log("send private message");
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
	},

	$scope.getMessages = function getMessages(){
		var usermessages = ChatResource.getpMessages();
		var messages = [];
		for(var i = 0; i < usermessages.length; i++){
			if(usermessages[i].sender === $scope.currentUser){
				messages.push(usermessages[i]);
			}
		}
		return messages;
	}
}]);