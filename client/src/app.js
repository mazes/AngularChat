"use strict";

angular.module("angularChat", ["ui.bootstrap", "ngRoute", "ngAnimate", "ui-notification", "hSweetAlert"])

    .value('loggedIn', {
        logged: false
    })

    .config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/", {
                templateUrl: "login/login.html",
                controller: "LoginController"
            }).when("/roomlist", {
            	templateUrl: "roomlist/roomlist.html",
            	controller: "RoomListController"
            }).when("/createroom", {
                templateUrl: "createroom/createroom.html",
                controller: "CreateRoomController"
            }).when("/chat/:room", {
                templateUrl: "chat/chat.html",
                controller: "ChatController"
            }).when("/chat/private/:chattee", {
                templateUrl: "privatechat/privateChat.html",
                controller: "PrivateChatController"
            }).otherwise("/", {
                templateUrl: "login/login.html",
                controller: "LoginController"
            });
        }])

    .directive('autofocus', ['$timeout',
        function ($timeout) {
          return {
            restrict: 'A',
            link: function ($scope, $element) {
              $timeout(function () {
                $element[0].focus();
              });
            }
          };
        }
    ]);
