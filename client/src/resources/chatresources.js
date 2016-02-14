"use strict";

angular.module("angularChat").factory("ChatResource",
function ChatResource(){
	var room = {};
	var currentUser = {};
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
			console.log("sendmessage resource:" ,message);
			socket.emit("sendmsg", message);
		},

		sendPrivateMessage: function sendPrivateMessage(obj, callback){
			socket.emit("privatemsg", obj, callback);
		},

		leaveChat: function leaveChat(room){
			socket.emit("partroom", room);
		},

        getRoom: function getRoom(){
        	console.log("getting room: ", room);
            return room;
        },
        setRoom: function setRoom(value){
        	console.log("setting room as: ", value);
            room = value;
        },
        getUser: function getUser(){
        	return currentUser;
        },
        setUser: function setUser(user){
        	currentUser = user;
        }
	};
});
