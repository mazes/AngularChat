"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$http", "$location", "ChatResource",
function listUsers($scope, $http, $locatopm, ChatResource){
	$scope.users = [];
	$scope.userList = function userList(){
		console.log("userlisttop");
		ChatResource.getUsers();
				socket.on("userlist", function(data){
					$scope.users = data;
					$scope.$apply;
				});
	};
}]);