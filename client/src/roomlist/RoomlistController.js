"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "socket",
function listUsers($scope, $routeParams, $http, $location, ChatResource, socket){
	$scope.currentUser = ChatResource.getUser();
	$scope.currentPassword = "";
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
		for (var op in roomobj.ops){
			if(op === $scope.currentUser){
				$location.url('/chat/' + theRoom);
				return;
			}
		}
		if(roomobj.locked){
			$scope.currentPassword = prompt("Enter password : ", "");
		}
		var room = {
			room: theRoom,
			pass: $scope.currentPassword
		};
		ChatResource.joinRoom(room, function(success, reason){
			if(!success){
				//prompt the reason why user wasn't able to join
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