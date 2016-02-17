"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope","$routeParams", "$http", "$location", "ChatResource", "socket",
function CreateRoomController($scope, $routeParams, $http, $location, ChatResource, socket){
	$scope.currentUser = ChatResource.getUser();

	$scope.createRoom = function createRoom(){
		$scope.currentUser = $routeParams.username;
		$scope.room = {
			room: $scope.name,
			pass: undefined,
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