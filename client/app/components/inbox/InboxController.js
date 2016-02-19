"use strict";

angular.module("angularChat").controller("InboxController",
["$scope","$routeParams", "$http", "$location", "ChatResource", "socket", "Notification",
function InboxController($scope, $routeParams, $http, $location, ChatResource, socket, Notification){
    $scope.currentUser = ChatResource.getUser();
    $scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
    
    socket.on("recv_privatemsg", function(user, message){
        ChatResource.addpMessage(message, user, $scope.currentUser);
        $scope.newmessage = ChatResource.getNewestPmessage();
        if($scope.newmessage.receiver === $scope.currentUser){
            Notification.primary({
                message: "You've received a private message from " + $scope.newmessage.sender,
                templateUrl: "app/components/chat/notify.html",
                scope: $scope,
                delay: 7000
            });
            $scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
            $scope.messages = $scope.getUnread();
        }
    });

    $scope.getUnread = function getUnread(){
        var messages = ChatResource.getpMessages();
        var unread = [];
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

    $scope.$on("$destroy", function(){
        socket.off("recv_privatemsg", function(success){});
    });
}]);