"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope", "ChatResource",
function($scope){
	$scope.room = "DaRoom";	
}]);