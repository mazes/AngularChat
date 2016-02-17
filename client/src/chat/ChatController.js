"use strict";

angular.module("angularChat").controller("ChatController",

["$scope", "$routeParams", "$http", "$location", "ChatResource", "$route", "socket", "$timeout", "Notification",
	function ChatController($scope, $routeParams, $http, $location, ChatResource, $route, socket, $timeout, Notification){
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
		$scope.serverMessages = [];
		$scope.isOp = false;
		$scope.setTopic = false;
		$scope.getMessages = function getMessages(){
			$scope.chat = $scope.currentRoom.messageHistory;
			$scope.users = $scope.currentRoom.users;
			$scope.ops = $scope.currentRoom.ops;
			$scope.topic = $scope.currentRoom.topic;
			$scope.bannedUsers = $scope.currentRoom.banned;
			for (var op in $scope.ops){
				if($scope.currentUser === op){
					$scope.isOp = true;
				}
			}
		};

		$scope.init = function init(){
			ChatResource.getRoomList();
		};

		socket.on("roomlist", function(data){
			for (var key in data) {
				if(key === $routeParams.room){
					$scope.currentRoom = data[key];
					$scope.getMessages();
				}
			}
		});	

		socket.on("recv_privatemsg", function(user, message){
			ChatResource.addpMessage(message, user, $scope.currentUser);
			$scope.newmessage = ChatResource.getNewestPmessage();
			if($scope.newmessage.receiver === $scope.currentUser){
				Notification.primary({
					message: "You've received a private message from " + $scope.newmessage.sender,
					templateUrl: "chat/notify.html",
					scope: $scope,
					delay: 7000
				});
			}
		});

		socket.on("updatechat", function(data, messages){
				ChatResource.getRoomList();
		});

		socket.on("updateusers", function(data, users, ops){
			ChatResource.getRoomList();
		});

		socket.on("updatetopic", function(room, topic, currentUser){
			if (room === $routeParams.room){
				$scope.topic = topic;
				$scope.sendServerMessage(currentUser + " set new topic for the room!");
			}
		});

		socket.on("servermessage", function(action, room, user){
			if(room === $routeParams.room){
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
			}
		});

		socket.on("kicked", function(room, user, currentUser){
			var message = currentUser + " kicked " + user + " from the room!";
			$scope.sendServerMessage(message);
		});

		socket.on("banned", function(room, user, currentUser){
			if(room === $routeParams.room){
				if(user === $scope.currentUser){
					$location.url("/roomlist");
					return;
				}

				ChatResource.getRoomList();
				var message = currentUser + " banned " + user + " from the room!";
				$scope.sendServerMessage(message);
			}
		});

		socket.on("opped", function(room, user, currentUser){
			if(room === $routeParams.room){	
				$scope.sendServerMessage(currentUser + " gave  " + user + " op rights!");
			}
		});

		socket.on("deopped", function(room, user, currentUser){
			if(room === $routeParams.room){
				$scope.sendServerMessage(currentUser + " stripped  " + user + " op rights!");
			}
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

		$scope.unBan = function unBan(user){
			$scope.userAction.user = user;
			ChatResource.unBanUser($scope.userAction, function(success){
				if(success){
					$scope.sendServerMessage("You un-banned user from room!");
					ChatResource.getRoomList();
					var pMessage = {
						nick: user,
						message: "I have un-banned you from room: " + $routeParams.room 
					};
					ChatResource.sendPrivateMessage(pMessage, function(success){
						if(success){
							$scope.sendServerMessage("You have notified user that he is free to join the room");
						}
					});

				}else{
					$scope.sendServerMessage("You need op rights for this operation!");
				}
			});
		};

		$scope.actionBarCommand = function actionBarCommand(command){
			switch(command){
				case "Send Message":
					$location.url('/chat/private/' + $scope.userAction.user);
					break;
				case "Kick":
					ChatResource.kickUser($scope.userAction, function(success){
						if(!success){
							$scope.sendServerMessage("You need op rights for this operation!");
						}
					});
					break;
				case "Ban":
					ChatResource.banUser($scope.userAction, function(success){
						if(!success){
							$scope.sendServerMessage("You need op rights for this operation!");
						}
					});
					break;
				case "Op":
					ChatResource.giveOP($scope.userAction, function(success){
						if(!success){
							$scope.sendServerMessage("You need op rights for this operation!");
						}
					});
					break;
				case "DeOp":
					ChatResource.deOP($scope.userAction, function(success){
						if(!success){
							$scope.sendServerMessage("You need op rights for this operation!");
						}
					});
					break;
				default:
					$scope.sendServerMessage("For some reason request failed!");
			}
			$scope.actionBar = true;
		};

		$scope.gotoPm = function gotoPm(message){
			$location.url('/chat/private/' + message.sender);
		};

		$scope.sendServerMessage = function sendServerMessage(message){
			$scope.serverMessages.push(message);
			//$scope.$apply();
			$timeout(function(){
           		$scope.serverMessages.shift();
       		}, 5000);
		};

		$scope.topicTrue = function topicTrue(){
			$scope.setTopic = true;
		};

		$scope.passwordTrue = function passwordTrue(){
			$scope.setPassword = true;
		};

		$scope.editTopic = function editTopic(){
			var top = {
				room: $routeParams.room,
				topic: $scope.newTopic
			};
			ChatResource.setTopic(top, function(success){
				if(success){
					console.log("topic set");
				}else{
					console.log("failed to set topic");
				}
			});
			$scope.newTopic = "";
			$scope.addTopic.$setPristine();
			$scope.setTopic = false;
		};

		$scope.editPassword = function editPassword(){
			var pass = {
				room: $routeParams.room,
				pass: $scope.newPassword
			};
			ChatResource.setPassword(pass, function(success){
				if(success){
					for (var op in $scope.ops){
						if(op !== $scope.currentUser){
							var message = {
								nick: op,
								message: "I changed the password in " + 
								$routeParams.room + " to: " + $scope.newPassword
							};
							ChatResource.sendPrivateMessage(message, function(success){
								if(success){
									$scope.sendServerMessage("You have sent the new password to other ops!");
								}
							});
						}
					}
				}
			});
			$scope.newPassword = "";
			$scope.setPass.$setPristine();
			$scope.setPassword = false;
		};

		$scope.removePassword = function removePassword(){
			var room = { room: $routeParams.room };
			ChatResource.removePassword(room, function(success){
				if(success){
					for (var op in $scope.ops){
						if(op !== $scope.currentUser){
							var message = {
								nick: op,
								message: "I removed the password in " + 
								$routeParams.room
							};
							ChatResource.sendPrivateMessage(message, function(success){
								if(success){
									$scope.sendServerMessage("You have sent the new password to other ops!");
								}
							});
						}
					}
				}
			});
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
