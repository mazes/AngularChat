"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
	function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket){
		$scope.roomName = $routeParams.room;
		$scope.currentUser = ChatResource.getUser();
		$scope.currentRoom = ChatResource.getRoom();
		$scope.chat = $scope.currentRoom.messageHistory;
		$scope.users = $scope.currentRoom.users;
		$scope.commands = ["Send Message", "Kick", "Ban", "Op", "DeOp"];
		$scope.actionBar = true;
		$scope.userAction = {
			room: $scope.roomName,
			user: undefined,
			operator: $scope.currentUser
		};

		//listen for message updates
		socket.on("updatechat", function(data, messages){
				$scope.chat = messages;
		});

		socket.on("updateusers", function(data, users){
			console.log("updusrs currentRoom: ",$scope.currentRoom);
			$scope.users = users;
		});

		socket.on('kicked', function(room, user, currentUser){
			var messageObj = {
				roomName: room,
				msg: currentUser + " kicked " + user + " from the room!"
			};
			ChatResource.sendMessage(messageObj);
		});

		$scope.leaveChat = function leaveChat(){
			var messageObj = {
				roomName: $scope.roomName,
				msg: $scope.currentUser + " has left the room!"
			};
			ChatResource.sendMessage(messageObj);
			ChatResource.leaveChat($scope.roomName);
			$location.url("/roomlist");
		};

		$scope.sendMessage = function sendMessage(){
			var messageObj = {
				roomName: $scope.roomName,
				msg: $scope.message
			};
			ChatResource.sendMessage(messageObj);
		};

		$scope.operations = function operations(user){
			$scope.userAction.user = user;
			$scope.actionBar = false;
		};

		$scope.actionBarCommand = function actionBarCommand(command){
			switch(command){
				case "Send Message":
					$location.url('/chat/private/' + $scope.userAction.user);
					break;
				case "Kick":
					ChatResource.kickUser($scope.userAction, function(success){
						if(success){
							console.log("user has been kicked");
						}else{
							console.log("user was not kicked");
						}
					});
					break;
				case "Ban":
					ChatResource.banUser($scope.userAction, function(success){
						if(success){
							console.log("user has been banned");
						}else{
							console.log("user was not banned");
						}
					});
					break;
				case "Op":
					ChatResource.giveOP($scope.userAction, function(success){
						if(success){
							console.log("user has been granted OP");
						}else{
							console.log("user was not granted OP");
						}
					});
					break;
				case "DeOp":
					ChatResource.banUser($scope.userAction, function(success){
						if(success){
							console.log("user has been deOpped");
						}else{
							console.log("user was not deopped");
						}
					});
					break;
				default:
					console.log("no switch command");
			}
			$scope.actionBar = true;
		};
	});
}]);