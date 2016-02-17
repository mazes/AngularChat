"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "socket",
function listUsers($scope, $routeParams, $http, $location, ChatResource, socket){
	$scope.currentUser = ChatResource.getUser();
	
	$scope.userList = function userList(){
		ChatResource.getUsers();
		socket.on("userlist", function(data){
			$scope.users = data;
		});
	};

	socket.on("roomlist", function(data){
			$scope.rooms = data;
	});	

	$scope.getRooms = function getRooms(){
		ChatResource.getRoomList();
	};

	$scope.joinRoom = function joinRoom(theRoom, roomobj){
		for (var user in roomobj.users){
			if(user === $scope.currentUser){
				$location.url('/chat/' + theRoom);
				return;
			}
		}
		var room = {
			room: theRoom,
			pass: undefined
		};
		ChatResource.joinRoom(room, function(success, reason){
			if(!success){
				console.log(reason);
			}else{
				$location.url('/chat/' + theRoom);
			}
		});
	};

	$scope.sendPrivate = function sendPrivate(user){
		$location.url('/chat/private/' + user);
	};

}]);