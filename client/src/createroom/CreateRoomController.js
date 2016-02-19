"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope","$routeParams", "$http", "$location", "ChatResource", "socket", "Notification",
function CreateRoomController($scope, $routeParams, $http, $location, ChatResource, socket, Notification){
	$scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
	$scope.currentUser = ChatResource.getUser();
	$scope.pass = undefined;

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
			$scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
		}
	});

	$scope.createRoom = function createRoom(){
		$scope.currentUser = $routeParams.username;
		$scope.room = {
			room: $scope.name,
			pass: $scope.pass,
			topic: $scope.topic
		};

		ChatResource.joinRoom($scope.room, function(success, reason){
			if(!success){
				console.log(reason);
			}else{
				$location.url('/chat/' + $scope.name);
				var topic = {
					room: $scope.name,
					topic: $scope.topic
				};
				ChatResource.setTopic(topic, function(success){});
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