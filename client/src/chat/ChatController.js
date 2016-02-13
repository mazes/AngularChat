"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$http", "$location", "ChatResource",
function ChatController($scope){
	$scope.chat = [
		{ user: "Jaun",
		  timestamp: "21:31:06",
		  message: "hi"},
	    { user: "alexa",
		  timestamp: "21:32:07",
		  message: "hello"},
		{ user: "Jaun",
		  timestamp: "21:33:02",
		  message: "how you doin?"},
	    { user: "Jaun",
	      timestamp: "21:35:20",
		  message: "like a glove"},
];
	$scope.currentChatroom = "Funderland"
}]);
