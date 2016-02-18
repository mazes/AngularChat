"use strict"

angular.module("angularChat").controller("InboxController",
["$scope","$routeParams", "$http", "$location", "ChatResource", "socket",
function InboxController($scope, $routeParams, $http, $location, ChatResource, socket){
	$scope.currentUser = ChatResource.getUser();
	$scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
	$scope.getUnread = function getUnread(){
		var messages = ChatResource.getpMessages();
		var unread = []
		for(var i = 0; i < messages.length; i++){
			if(!messages[i].read){
				unread.push(messages[i]);
			}
		}
		return unread;
	};

	$scope.gotoPm = function gotoPm(sender){
		$location.url('/chat/private/' + sender);
	};

	$scope.messages = $scope.getUnread();
}]);