"use strict";

angular.module("angularChat").factory("ChatResource", ["socket",
function ChatResource(socket){
    var room = {};
    var currentUser = {};
    var pMessages = [];
    var currRoom = "";

    return {
        login: function login(user, pass, callback){
            socket.emit("adduser", user, callback);
        },

        getRoomList: function getRoomList(){
            socket.emit("rooms");
        },

        getUsers: function getUsers(){
            socket.emit("users");
        },

        joinRoom: function joinRoom(room, callback) {
            socket.emit("joinroom", room, callback);
        },

        setTopic: function setTopic(obj, callback){
            socket.emit("settopic", obj, callback);
        },

        sendMessage: function sendMessage(message){
            socket.emit("sendmsg", message);
        },

        sendPrivateMessage: function sendPrivateMessage(obj, callback){
            socket.emit("privatemsg", obj, callback);
        },

        leaveChat: function leaveChat(room){
            socket.emit("partroom", room);
        },

        kickUser: function kickUser(action, callback){
            socket.emit("kick", action, callback);
        },

        banUser: function banUser(action, callback){
            socket.emit("ban", action, callback);
        },

        unBanUser: function unBanUser(action, callback){
            socket.emit("unban", action, callback);
        },
        
        giveOP: function giveOP(action, callback){
            socket.emit("op", action, callback);
        },

        deOP: function deOP(action, callback){
            socket.emit("deop", action, callback);
        },

        disconnect: function disconnect(){
            socket.disconnect();
        },

        setPassword: function setPassword(pass, callback){
            socket.emit("setpassword", pass, callback);
        },

        removePassword: function removePassword(room, callback){
            socket.emit("removepassword", room, callback);
        },

        getUser: function getUser(){
            return currentUser;
        },

        setUser: function setUser(user){
            currentUser = user;
        },

        addpMessage: function addpMessage(message, sender, receiver){
            var date = new Date();
            var pmsg = {
                receiver: receiver,
                sender: sender,
                message: message,
                date: date,
                read: false
            };
            pMessages.push(pmsg);
        },
        
        getpMessages: function getpMessages(){
            return pMessages;
        },

        getNewestPmessage: function getNewestPmessage(){
            return pMessages[pMessages.length-1];
        },

        getNumberOfUnreadMessages: function getNumberOfUnreadMessages(){
            var counter = 0;
            for(var i = 0; i < pMessages.length; i++){
                if(!pMessages[i].read){
                    counter += 1;
                }
            }
            return counter;
        },

        setCurrentRoom: function setCurrentRoom(room){
            currRoom = room;
        },

        getCurrentRoom: function getCurrentRoom(){
            return currRoom;
        }
    };
}]);
