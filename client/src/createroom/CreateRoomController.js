"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope", "$http", "$location", "ChatResource",
function CreateRoomController($scope, $http, $location, ChatResource){
	$scope.createRoom = function createRoom(){
		$scope.room = {
			room: undefined,
			pass: undefined,
			topic: $scope.topic,
		};
		ChatResource.joinRoom($scope.room, function(success, reason){
			if(!success){
				console.log(reason);
			}
		});
	};
}]);