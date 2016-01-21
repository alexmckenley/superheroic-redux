angular.module('shr.utils.chat-web-api', [
    'shr.actions.chat-server'
])

.factory('chatWebApiUtils', function chatWebApiUtils(chatServerActions) {
    var util = {
       getAllMessages: getAllMessages, 
       createMessage: createMessage
   };

   function getAllMessages() {
        // simulate retrieving data from a database
        var rawMessages = JSON.parse(localStorage.getItem('messages'));

        // simulate success callback
        chatServerActions.receiveAll(rawMessages);
    }

    function createMessage(message, threadName) {
        // simulate writing to a database
        var rawMessages = JSON.parse(localStorage.getItem('messages'));
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var threadID = message.threadID || ('t_' + Date.now());
        var createdMessage = {
            id: id,
            threadID: threadID,
            threadName: threadName,
            authorName: message.authorName,
            text: message.text,
            timestamp: timestamp
        };
        rawMessages.push(createdMessage);
        localStorage.setItem('messages', JSON.stringify(rawMessages));

        // simulate success callback
        setTimeout(function() {
            chatServerActions.receiveCreatedMessage(createdMessage);
        }, 0);
    }

    return util;
});
