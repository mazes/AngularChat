"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams){
	console.log(" in chat");
	$scope.chat = [];
	$scope.chatter = $routeParams.username;
	$scope.user = $routeParams.currentUser;
	console.log($routeParams);
}]);