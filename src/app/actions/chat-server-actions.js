angular.module('shr.actions.chat-server', [])

.factory('chatServerActions', function chatServerActionsFactory() {
    var actions = {
        RECEIVE_ALL: 'RECEIVE_ALL',
        RECEIVE_CREATED_MESSAGE: 'RECEIVE_CREATED_MESSAGE',
        receiveAll: receiveAll,
        receiveCreatedMessage: receiveCreatedMessage
    };

    function receiveCreatedMessage(message) {
        return {
            type: 'RECEIVE_CREATED_MESSAGE',
            message: message
        };
    }

    function receiveAll(messages) {
        return {
            type: 'RECEIVE_ALL',
            messages: messages
        };
    }

    return actions;
});
