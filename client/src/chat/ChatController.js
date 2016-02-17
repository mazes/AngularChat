"use strict";

angular.module("angularChat").controller("ChatController",

["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket", "$timeout", "ngToast",
	function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket, $timeout, ngToast){
		$scope.roomName = $routeParams.room;
		$scope.currentUser = ChatResource.getUser();
		$scope.commands = ["Send Message", "Kick", "Ban", "Op", "DeOp"];
		$scope.actionBar = true;
		$scope.isServerMsg = true;
		$scope.userAction = {
			room: $scope.roomName,
			user: undefined,
			operator: $scope.currentUser
		};
		$scope.isOp = false;
		$scope.setTopic = false;
		$scope.getMessages = function getMessages(){
			$scope.chat = $scope.currentRoom.messageHistory;
			$scope.users = $scope.currentRoom.users;
			$scope.ops = $scope.currentRoom.ops;
			$scope.topic = $scope.currentRoom.topic;
			for (var op in $scope.ops){
				if($scope.currentUser === op){
					$scope.isOp = true;
				}
			}
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
			ChatResource.addpMessage(message, user, $scope.currentUser);
			var message = ChatResource.getNewestPmessage();
			if(message.receiver === $scope.currentUser){
        		ngToast.create('You received a private message from: ' + message.sender);
        		//$location.url('/chat/private/' + message.sender);
			}
		});

		socket.on("updatechat", function(data, messages){
				$scope.chat = messages;
		});

		socket.on("updateusers", function(data, users, ops){
			$scope.users = users;
			$scope.ops = ops;
			for (var op in $scope.ops){
				console.log("user is op");
				if($scope.currentUser === op){
					$scope.isOp = true;
				}
			}
		});

		socket.on("updatetopic", function(room, topic, currentUser){
			var message = currentUser + " set new topic for the room!";
			$scope.topic = topic;
			$scope.sendServerMessage(message);
		});

		socket.on("servermessage", function(action, room, user){
			var message ="";
			switch(action){
				case "join":
					message = user + " has joined the room!";
					break;
				case "part":
					message = user + " has left the room!";
					break;
				case "quit":
					message = user + "has disconnected from server!";
			}
			$scope.sendServerMessage(message);
		});

		socket.on("kicked", function(room, user, currentUser){
			var message = currentUser + " kicked " + user + " from the room!";
			$scope.sendServerMessage(message);
		});

		socket.on("banned", function(room, user, currentUser){
			if(user === $scope.currentUser){
				$location.url("/roomlist");
				return;
			}
			var message = currentUser + " banned " + user + " from the room!";
			$scope.sendServerMessage(message);
		});

		socket.on("opped", function(room, user, currentUser){
			var message = currentUser + " gave  " + user + " op rights!";
			$scope.sendServerMessage(message);
		});

		socket.on("deopped", function(room, user, currentUser){
			var message = currentUser + " stripped  " + user + " op rights!";
			$scope.sendServerMessage(message);
		});

		$scope.leaveChat = function leaveChat(){
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
						if(!success){
							var message = "You need op rights for this operation!";
							$scope.sendServerMessage(message);
						}
					});
					break;
				case "Ban":
					ChatResource.banUser($scope.userAction, function(success){
						if(!success){
							var message = "You need op rights for this operation!";
							$scope.sendServerMessage(message);
						}
					});
					break;
				case "Op":
					ChatResource.giveOP($scope.userAction, function(success){
						if(!success){
							var message = "You need op rights for this operation!";
							$scope.sendServerMessage(message);
						}
					});
					break;
				case "DeOp":
					ChatResource.deOP($scope.userAction, function(success){
						if(!success){
							var message = "You need op rights for this operation!";
							$scope.sendServerMessage(message);
						}
					});
					break;
				default:
					var message = "For some reason request failed!";
					$scope.sendServerMessage(message);
			}
			$scope.actionBar = true;
		};

		$scope.sendServerMessage = function sendServerMessage(message){
			$scope.serverMessage = message;
			$scope.isServerMsg = false;
			$timeout(function(){
           		$scope.isServerMsg = true;
       		}, 5000);
		};

		$scope.editTopic = function editTopic(){
			var top = {
				room: $routeParams.room,
				topic: $scope.newTopic
			};
			$scope.newTopic = "";
			ChatResource.setTopic(top, function(success){
				if(success){
					console.log("topic set");
				}else{
					console.log("failed to set topic");
				}
			});
			console.log($scope.addTopic);
			$scope.addTopic.$setPristine();
			$scope.setTopic = false;
		};

		$scope.topicTrue = function topicTrue(){
			$scope.setTopic = true;
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
