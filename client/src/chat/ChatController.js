"use strict";

angular.module("angularChat").controller("ChatController",
["$scope", "$http", "$location", "ChatResource",
function ChatController($scope){
	$scope.message = { ["hi" , "hello", "how are you?", "I'm great" ]
	}

}]);
