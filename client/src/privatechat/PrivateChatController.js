"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();

	socket.on("recv_privatemsg", function(user, message){
		var pmessage = {
			receiver: $scope.chattee,
			sender: user,
			message: message
		};
		ChatResource.addpMessage(pmessage);
		$scope.chat = $scope.getMessages();
	});

	$scope.sendPrivateMessage = function sendPrivateMessage(user){
		$scope.privateMessage = {
			nick: user,
			message: $scope.message
		};
		ChatResource.sendPrivateMessage($scope.privateMessage, function(success){
			if(!success){
				console.log("did not work");
			}else{
				$scope.date = new Date();
				var pmessage = {
					receiver: $scope.chattee,
					sender: $scope.currentUser,
					message: $scope.message,
					date: $scope.date
				};
				ChatResource.addpMessage(pmessage);
				$scope.chat = $scope.getMessages();
			}
		});
	};

	$scope.getMessages = function getMessages(){
		var usermessages = ChatResource.getpMessages();
		console.log(usermessages);
		var messages = [];
		console.log("Current user:", $scope.currentUser);
		for(var i = 0; i < usermessages.length; i++){
			if(usermessages[i].sender === $scope.currentUser || usermessages[i].receiver === $scope.currentUser){
				messages.push(usermessages[i]);
			}
		}
		console.log(messages);
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