angular.module("angularChat").factory('socket',["$rootScope", function ($rootScope) {
  var socket = io.connect("http://localhost:8080");
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },
    off: function (eventName, callback){
      socket.removeAllListeners(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }      
        });
      });
    },
    disconnect: function (){
      socket.disconnect();
    }
  };
}]);