"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function listUsers($scope, $routeParams, $http, $location, ChatResource){
	$scope.currentUser = $routeParams.username;
	$scope.users = [];
	$scope.rooms = [];
	$scope.userList = function userList(){
		ChatResource.getUsers();
		socket.on("userlist", function(data){
			$scope.users = data;
			$scope.$apply();
		});
	},
	$scope.getRooms = function getRooms(){
		ChatResource.getRoomList();
		socket.on("roomlist", function(data, a, b){
			$scope.rooms = data;
			$scope.$apply();
			console.log($scope.rooms, a, b);
		});	
	};
}]);