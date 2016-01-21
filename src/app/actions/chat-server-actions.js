angular.module('shr.actions.chat-server', [
    'shr.utils.chat-web-api'
])

.factory('chatServerActions', function chatServerActionsFactory(chatWebApiUtils) {
    var actions = {
        FETCH_ALL: 'FETCH_ALL',
        RECEIVE_ALL: 'RECEIVE_ALL',
        RECEIVE_CREATED_MESSAGE: 'RECEIVE_CREATED_MESSAGE',
        fetchAll: fetchAll,
        receiveAll: receiveAll,
        receiveCreatedMessage: receiveCreatedMessage
    };

    function fetchAll() {
        return function(dispatch) {
            chatWebApiUtils.getAllMessages()
                .then(function(allMessages) {
                    dispatch(actions.receiveAll(allMessages));
                });
        };
    }

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
