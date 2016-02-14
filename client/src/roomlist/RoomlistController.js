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
	$scope.joinRoom = function joinRoom(theRoom){
		var room ={
			room: theRoom,
			pass: undefined
		};
		console.log(room, "the room");
		ChatResource.joinRoom(room, function(success, reason){
		if(!success){
				console.log(reason);
		}else{
			console.log("joinroom: " + success);
			$location.url('/chat/'+ $routeParams.username +'/' + theRoom);
			$scope.$apply();
		}
		});
	}
}]);