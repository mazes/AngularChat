"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams, ChatResource){
	$scope.chat = [];
	$scope.chatter = $routeParams.chattee;
	$scope.currentUser = $routeParams.username;
	console.log($scope.chatter);
}]);