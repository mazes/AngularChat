"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "ChatResource",
function($scope){
	$scope.rooms = "room1 room2....";	
}]);