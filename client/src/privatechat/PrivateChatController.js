"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();

	socket.on("recv_privatemsg", function(user, message){
		console.log("Receiving message");
		ChatResource.addpMessage(message, user, $scope.currentUser);
		$scope.chat = $scope.getMessages();
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
				ChatResource.addpMessage($scope.message, $scope.currentUser, user);
				$scope.chat = $scope.getMessages();
			}
		});
	};

	$scope.getMessages = function getMessages(){
		var usermessages = ChatResource.getpMessages();
		console.log(usermessages);
		var messages = [];
		for(var i = 0; i < usermessages.length; i++){
			if($scope.currUserChattee(usermessages[i]) || $scope.chatteeCurrUser(usermessages[i])){
				messages.push(usermessages[i]);
			}
		}
		return messages;
	};

	$scope.currUserChattee = function currUserChattee(usermessage){
		return usermessage.sender === $scope.currentUser &&  usermessage.receiver === $routeParams.chattee;
	};

	$scope.chatteeCurrUser = function chatteeCurrUser(usermessage){
		return usermessage.sender === $routeParams.chattee &&  usermessage.receiver === $scope.currentUser;
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