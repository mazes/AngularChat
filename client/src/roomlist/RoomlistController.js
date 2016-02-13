"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$http", "$location", "ChatResource",
function listUsers($scope, $http, $locatopm, ChatResource){
	$scope.users = [];
	$scope.rooms = [];
	$scope.userList = function userList(){
		$scope.users = ChatResource.getUsers();
		$scope.$apply();
	},
	$scope.getRooms = function getRooms(){
		$scope.rooms = ChatResource.getRoomList();
		$scope.$apply();
	};
}]);