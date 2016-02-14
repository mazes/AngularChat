"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope","$routeParams", "$http", "$location", "ChatResource",
function CreateRoomController($scope, $routeParams, $http, $location, ChatResource){
	$scope.currentUser = $routeParams.username;
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
				$location.url('/chat/'+ $scope.currentUser +'/' + $scope.name);
				console.log("location.url " + '/chat/'+ $scope.currentUser +'/' + $scope.name);
				$scope.$apply();
			}
		});
	};
}]);