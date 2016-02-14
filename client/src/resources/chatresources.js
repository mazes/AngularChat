"use strict";

angular.module("angularChat").factory("ChatResource",
function ChatResource(){
	return {
		login: function login(user, pass, callback){
			socket.emit("adduser", user, callback);
		},

		getRoomList: function getRoomList(){
			socket.emit("rooms");
			/*Should get called to receive a list of available rooms. There are no parameters. The server responds by emitting the "roomlist" event
			(the client needs to listen to this event from the server).*/
		},

		getUsers: function getUsers(){
			socket.emit("users");
			/*This should get called to get a list of all connected users.
			There are no parameters for this function. The server will emit the "userlist"
			 event back to the caller, containing a list of userids currently "logged in"*/
		},

		joinRoom: function newRoom(room, callback) {
			socket.emit("joinroom", room, callback);
		},

		setTopic: function setTopic(obj, callback){
			socket.emit("settopic", obj, callback);
		},

		sendMessage: function sendMessage(message){
			socket.emit("sendmsg", message);
			/*Should get called when a user wants to send a message to a room. Parameters: a single object containing
			 the following properties: {roomName: "the room identifier", msg: "The message itself, only the first 200 chars are 
			 considered valid" } The server will then emit the "updatechat" event, after the message has been accepted.
			 */
		},

		sendPrivateMessage: function sendPrivateMessage(obj, callback){
			socket.emit("privatemsg", obj, callback);
			/*
			Used if the user wants to send a private message to another user. Parameters: an object containing the 
			following properties: {nick: "the userid which the message should be sent to", message: "The message itself" } 
			a callback function, accepting a single boolean parameter, stating if the message could be sent or not. 
			The server will then emit the "recv_privatemsg" event to the user which should receive the message.
			*/
		},

		leaveChat: function leaveChat(room){
			socket.emit("partroom", room);
			/*
			Used when a user wants to leave a room. Parameters: a single string, i.e. the ID of the room which the user is leaving.
			The server will then emit the "updateusers" event to the remaining users in the room, and a "servermessage" with the 
			first parameter set to "part".
			*/
		}
	}
});
