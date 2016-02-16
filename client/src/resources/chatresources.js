"use strict";

angular.module("angularChat").factory("ChatResource", ["socket",
function ChatResource(socket){
	var room = {};
	var currentUser = {};
	var pMessages = [];

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

		giveOP: function giveOP(action, callback){
			socket.emit("op", action, callback);
		},

		deOP: function deOP(action, callback){
			socket.emit("deop", action, callback);
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
				date: date
			};
        	pMessages.push(pmsg);
        },
        
        getpMessages: function getpMessages(){
        	return pMessages;
        },

        getNewestPmessage: function getNewestPmessage(){
        	return pMessages[pMessages.length-1];
        }
	};
}]);
