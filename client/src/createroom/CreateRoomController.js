"use strict";

angular.module("angularChat").controller("CreateRoomController",
["$scope", "$http","ChatResource",
function($scope, $http){
	$scope.room = "DaRoom";	
}]);