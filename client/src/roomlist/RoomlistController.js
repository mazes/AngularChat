"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$routeParams", "$http", "$location", "ChatResource", "socket", "sweet", "Notification",
function listUsers($scope, $routeParams, $http, $location, ChatResource, socket, sweet, Notification){
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
			sweet.show({
				title: 'This room is password protected',
				text: 'Please enter the password',
				type: 'input',
				showCancelButton: true,
				closeOnConfirm: true,
				animation: 'slide-from-top',
				inputPlaceholder: 'Write something'
			}, function(inputValue){
				if (inputValue === false){
					return false;
				}

				if (inputValue === '') {
					sweet.showInputError('You need to write something!');
					return false;
				}
				$scope.currentPassword = inputValue;
				$scope.checkIfValid(inputValue, theRoom);
			});
		}
	};

	$scope.checkIfValid = function checkIfValid(passwd, theRoom){
		var room = {
			room: theRoom,
			pass: passwd
		};
		ChatResource.joinRoom(room, function(success, reason){
			if(!success){
				//prompt the reason why user wasn't able to join
				Notification.error({
					title: 'Could not enter room',
					message: 'Reason: ' + reason,
					positionY: 'top',
					positionX: 'right'
				});
			}else{
				$location.url('/chat/' + theRoom);
			}
		});
	}

	$scope.sendPrivate = function sendPrivate(user){
		$location.url('/chat/private/' + user);
	};

}]);