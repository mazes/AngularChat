"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();

	socket.on("recv_privatemsg", function(user, message){
		console.log("private message rec");
		$scope.date = new Date();
		var pmessage = {
			receiver: $scope.chattee,
			sender: user,
			message: message,
			date: $scope.date
		};
		console.log(pmessage);
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
	};

	$scope.getMessages = function getMessages(){
		console.log("getMessages PrivateChatController");
		var usermessages = ChatResource.getpMessages();
		var messages = [];
		for(var i = 0; i < usermessages.length; i++){
			if(usermessages[i].sender === $scope.currentUser || usermessages[i].receiver === $scope.currentUser){
				messages.push(usermessages[i]);
			}
		}
		return messages;
	};

	$scope.$on("$destroy", function(){
		socket.off("recv_privatemsg", function(success){
			if(success){
				console.log("destroy");
			}else{
				console.log("failed destroy");
			}
		});
	});

	$scope.chat = $scope.getMessages();
}]);