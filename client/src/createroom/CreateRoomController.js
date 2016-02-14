"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope","$routeParams", "$http", "$location", "ChatResource",
function CreateRoomController($scope, $routeParams, $http, $location, ChatResource){
	$scope.createRoom = function createRoom(){
		$scope.room = {
			room: $scope.name,
			pass: undefined,
			topic: $scope.topic
		};
			ChatResource.joinRoom($scope.room, function(success, reason){
			if(!success){
				console.log(reason);
			}else{

			}
		});
	};
}]);