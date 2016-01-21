angular.module('shr.utils.chat-message', [])

.factory('chatMessageUtils', function chatMessageUtils() {
    var util = {
        convertRawMessage: convertRawMessage
    };

    function convertRawMessage(rawMessage, currentThreadID) {
        return {
            id: rawMessage.id,
            threadID: rawMessage.threadID,
            authorName: rawMessage.authorName,
            date: new Date(rawMessage.timestamp),
            text: rawMessage.text,
            isRead: rawMessage.threadID === currentThreadID
        };
    }

    return util;
});
