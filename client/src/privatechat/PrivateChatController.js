"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();

	socket.on("recv_privatemsg", function(user, message){
		console.log("inside recv message with: " + message + " user:" + user + " currentuser: " + $scope.currentUser);
		$scope.addpMessage(message, user, $scope.currentUser);
	});

	$scope.sendPrivateMessage = function sendPrivateMessage(user){
		console.log("Inside send pm with user:" + user + " currentuser: " + $scope.currentUser);
		$scope.privateMessage = {
			nick: user,
			message: $scope.message
		};
		ChatResource.sendPrivateMessage($scope.privateMessage, function(success){
			if(!success){
				console.log("did not work");
			}else{
				$scope.addpMessage($scope.message, $scope.currentUser, user);
			}
		});
	};

	$scope.addpMessage = function(message, sender, receiver){
		$scope.date = new Date();
		var pmessage = {
			receiver: receiver,
			sender: sender,
			message: message,
			date: $scope.date
		};
		ChatResource.addpMessage(pmessage);
		$scope.chat = $scope.getMessages();
	};

	$scope.getMessages = function getMessages(){
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