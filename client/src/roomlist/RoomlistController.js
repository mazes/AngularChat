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
		socket.on("roomlist", function(data){
			$scope.rooms = data;
			$scope.$apply();
			console.log($scope.rooms);
		});	
	},
	$scope.joinRoom = function joinRoom(theRoom, roomobj){
		ChatResource.joinRoom(roomobj, function(success, reason){
		if(!success){
				console.log(reason);
		}else{
			console.log("joinroom: " + success);
			ChatResource.setRoom(roomobj);
			$location.url('/chat/'+ $routeParams.username +'/' + theRoom);
			$scope.$apply();
		}
		});
	},
	$scope.sendPrivate = function sendPrivate(user){
		$location.url('/chat/private/' + $routeParams.username + '/' + user);
	}
}]);