"use strict";

angular.module("angularChat", ["ui.bootstrap", "ngRoute", "ngAnimate", "ui-notification", "hSweetAlert"])

    .value('loggedIn', {
        logged: false
    })

    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
                templateUrl: "app/components/login/login.html",
                controller: "LoginController"
            }).when("/roomlist", {
            	templateUrl: "app/components/roomlist/roomlist.html",
            	controller: "RoomListController"
            }).when("/createroom", {
                templateUrl: "app/components/createroom/createroom.html",
                controller: "CreateRoomController"
            }).when("/chat/:room", {
                templateUrl: "app/components/chat/chat.html",
                controller: "ChatController"
            }).when("/chat/private/:chattee", {
                templateUrl: "app/components/privatechat/privateChat.html",
                controller: "PrivateChatController"
            }).when("/unreadpms/", {
                templateUrl: "app/components/inbox/inbox.html",
                controller: "InboxController"
            }).otherwise("/", {
                templateUrl: "app/components/login/login.html",
                controller: "LoginController"
            });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
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
