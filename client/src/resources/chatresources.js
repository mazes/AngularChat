"use strict";

angular.module("angularChat").factory("ChatResource",
function ChatResource(){
	return {
		login: function login(user, pass, callback){
			socket.emit("adduser", user, callback);
		},
			/*Should get called when a user wants to join a room.
			Note that the API supports a password-protected room,
			however this is optional, i.e. your implementation doesn't
			have to support this. Parameters: an object containing the
			following properties: { room: "the id of the room, undefined
			if the user is creating a new room", pass: "a room password - not required"}
			 a callback function which accepts two parameters: a boolean parameter,
			  stating if the request was successful or not. and if not
			  (due to password protection or because of something else),
			  the reason why the join wasn't successful.
			  The server responds by emitting the following events:
			  "updateusers" (to all participants in the room), "updatetopic"
			  (to the newly joined user, not required to handle this),
			  "servermessage" with the first parameter set to "join"
			  ( to all participants in the room, informing about the newly added user).
			  If a new room is being created, the message "updatechat" is also emitted.
			*/

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

		joinRoom: function joinRoom(room, callback) {
			console.log(room);
			socket.emit("joinroom", room, callback);
		}
	}
});
