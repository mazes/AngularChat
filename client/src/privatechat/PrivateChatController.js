"use strict";

angular.module("angularChat").controller("PrivateChatController",
["$scope", "$routeParams", "$location", "ChatResource", "$route", "socket", "loggedIn",
function ChatController($scope, $routeParams, $location, ChatResource, $route, socket, loggedIn){
	if(!loggedIn.logged){
		$location.url('/');
	}
	$scope.chattee = $routeParams.chattee;
	$scope.currentUser = ChatResource.getUser();
	$scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();

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
		var messages = [];
		for(var i = 0; i < usermessages.length; i++){
			if($scope.currUserChattee(usermessages[i]) || $scope.chatteeCurrUser(usermessages[i])){
				usermessages[i].read = true;
				messages.push(usermessages[i]);
			}
			$scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
		}
		return messages;
	};

	$scope.currUserChattee = function currUserChattee(usermessage){
		return usermessage.sender === $scope.currentUser &&  usermessage.receiver === $routeParams.chattee;
	};

	$scope.chatteeCurrUser = function chatteeCurrUser(usermessage){
		return usermessage.sender === $routeParams.chattee &&  usermessage.receiver === $scope.currentUser;
	};

	$scope.goToChat = function goToChat(user){
		$location.url('/chat/private/' + user);
	};

	$scope.getUsers = function getUsers(){
		ChatResource.getUsers();
		socket.on("userlist", function(data){
			$scope.users = data;
		});
	};

	$scope.leavePrivate = function leavePrivate(){
		
	};

	$scope.$on("$destroy", function(){
		socket.off("recv_privatemsg", function(success){});
	});

	$scope.chat = $scope.getMessages();
}]);