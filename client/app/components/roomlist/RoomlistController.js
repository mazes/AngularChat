"use strict";

angular.module("angularChat").controller("RoomListController",
["$scope", "$routeParams", "$location", "ChatResource", "socket", "sweet", "Notification", "loggedIn",
function listUsers($scope, $routeParams, $location, ChatResource, socket, sweet, Notification, loggedIn){
    if(!loggedIn.logged){
        $location.url('/');
    }
    $scope.unReadMessages = ChatResource.getNumberOfUnreadMessages();
    $scope.currentUser = ChatResource.getUser();
    $scope.currentPassword = "";
    $scope.userList = function userList(){
        ChatResource.getUsers();
    };

    $scope.getRooms = function getRooms(){
        ChatResource.getRoomList();
    };

    socket.on("updateusers", function(){
        console.log("updateusers");
        $scope.userList();
        $scope.getRooms();
    });

    socket.on("roomlist", function(data){
        $scope.rooms = data;
    }); 

    socket.on("userlist", function(data){
        $scope.users = data;
    });

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
        }
    });

    $scope.joinRoom = function joinRoom(theRoom, roomobj){
        for (var user in roomobj.users){
            if(user === $scope.currentUser){
                $location.url('/chat/' + theRoom);
                return;
            }
        }
        for (var op in roomobj.ops){
            if(op === $scope.currentUser){
                $location.url('/chat/' + theRoom);
                return;
            }
        }
        if(roomobj.locked){
            sweet.show({
                title: 'This room is password protected',
                text: 'Please enter the password',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: true,
                animation: 'slide-from-top',
                inputPlaceholder: 'Write something'
            }, 
            function(inputValue){
                $scope.currentPassword = inputValue;
                $scope.checkIfValid(inputValue, theRoom);
            });
        }else{
                var room = {
                room: theRoom,
                pass: undefined
            };
            ChatResource.joinRoom(room, function(success, reason){
                if(!success){
                    console.log(reason);
                }else{
                    ChatResource.setCurrentRoom(theRoom);
                    $location.url('/chat/' + theRoom);
                }
            });
        }
    };

    $scope.checkIfValid = function checkIfValid(passwd, theRoom){
        var room = {
            room: theRoom,
            pass: passwd
        };
        ChatResource.joinRoom(room, function(success, reason){
            if(!success){
                Notification.error({
                    title: 'Could not enter room',
                    message: 'Reason: ' + reason,
                    positionY: 'top',
                    positionX: 'right'
                });
            }else{
                ChatResource.setCurrentRoom(theRoom);
                $location.url('/chat/' + theRoom);
            }
        });
    };

    $scope.gotoPm = function gotoPm(sender){
        $location.url('/chat/private/' + sender);
    };

    $scope.sendPrivate = function sendPrivate(user){
        $location.url('/chat/private/' + user);
    };

    $scope.$on("$destroy", function(){
        socket.off("recv_privatemsg", function(success){});
    });
}]);