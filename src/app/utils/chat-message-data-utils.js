angular.module('shr.utils.chat-message-data', [])

.factory('chatMessageDataUtils', function chatMessageDataUtils() {
    var util = {
        getCreatedMessageData: getCreatedMessageData 
    };

    function getCreatedMessageData(text, threadID) {
        var timestamp = Date.now();

        return {
            id: 'm_' + timestamp,
            threadID: threadID,
            authorName: 'Bill', // hard coded for this example
            date: new Date(timestamp),
            text: text,
            isRead: true
        };
    }

    return util;
});
