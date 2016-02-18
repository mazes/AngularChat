"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope","$routeParams", "$location", "ChatResource", "socket", "loggedIn",
function CreateRoomController($scope, $routeParams, $location, ChatResource, socket, loggedIn){
	if(!loggedIn.logged){
		$location.url('/');
	}
	$scope.currentUser = ChatResource.getUser();
	$scope.pass = undefined;
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
}]);