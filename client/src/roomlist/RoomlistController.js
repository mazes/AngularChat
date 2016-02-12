"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$http", "ChatResource",
function($scope, $http){
	$scope.rooms = "room1 room2....";	
}]);