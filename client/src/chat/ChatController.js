"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket",
	function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket, ngToast){
		$scope.roomName = $routeParams.room;
		$scope.currentUser = ChatResource.getUser();
		$scope.commands = ["Send Message", "Kick", "Ban", "Op", "DeOp"];
		$scope.actionBar = true;
		$scope.userAction = {
			room: $scope.roomName,
			user: undefined,
			operator: $scope.currentUser
		};

		$scope.getMessages = function getMessages(){
			$scope.chat = $scope.currentRoom.messageHistory;
			$scope.users = $scope.currentRoom.users;
		};

		$scope.init = function init(){
			console.log("init");
			ChatResource.getRoomList();
			socket.on("roomlist", function(data){
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						if(key === $scope.roomName){
							$scope.currentRoom = data[key];
							$scope.getMessages();
						}
					}
				}
			});	
		};

		socket.on("recv_privatemsg", function(user, message){
			console.log("Receiving message");
			ChatResource.addpMessage(message, user, $scope.currentUser);
			var message = ChatResource.getNewestPmessage();
			if(message.receiver === $scope.currentUser){
        		ngToast.create('a toast message...');
        		//$location.url('/chat/private/' + message.sender);
			}
		});

		//listen for message updates
		socket.on("updatechat", function(data, messages){
				$scope.chat = messages;
		});

		socket.on("updateusers", function(data, users){
			console.log("updateusers ", data, users);
			$scope.users = users;
		});

		socket.on('kicked', function(room, user, currentUser){
			if(currentUser === $scope.currentUser){
				var messageObj = {
					roomName: room,
					msg: currentUser + " kicked " + user + " from the room!"
				};
				ChatResource.sendMessage(messageObj);
			}
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
							console.log($scope.userAction.user +" has been kicked by " + $scope.userAction.operator);
						}else{
							console.log($scope.userAction.user +" was not kicked by " + $scope.userAction.operator);
						}
					});
					break;
				case "Ban":
					ChatResource.banUser($scope.userAction, function(success){
						if(success){
							console.log($scope.userAction.user + " has been banned by " + $scope.userAction.operator);
						}else{
							console.log($scope.userAction.user + " was not banned by " + $scope.userAction.operator);
						}
					});
					break;
				case "Op":
					ChatResource.giveOP($scope.userAction, function(success){
						if(success){
							console.log($scope.userAction.user + " has been granted OP by " + $scope.userAction.operator);
						}else{
							console.log($scope.userAction.user + " was not granted OP by " + $scope.userAction.operator);
						}
					});
					break;
				case "DeOp":
					ChatResource.banUser($scope.userAction, function(success){
						if(success){
							console.log($scope.userAction.user + " has been deOpped by " + $scope.userAction.operator);
						}else{
							console.log($scope.userAction.user + " was not deopped by " + $scope.userAction.operator);
						}
					});
					break;
				default:
					console.log("no switch command");
			}
			$scope.actionBar = true;
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
}]);
