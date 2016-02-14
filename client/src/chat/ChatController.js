"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$routeParams", "$http", "$location", "ChatResource",
function ChatController($scope, $routeParams, $http, $location, ChatResource){
	$scope.chat = [];
	$scope.chatter = $routeParams.chattee;
	$scope.currentUser = $routeParams.username;

	$scope.leaveChat = function leaveChat(){
		ChatResource.leaveChat($scope.chatter);
	}
}