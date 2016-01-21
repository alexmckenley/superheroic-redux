angular.module('shr.actions.chat-message', [
    'shr.utils.chat-web-api',
    'shr.utils.chat-message-data',
    'shr.actions.chat-server'
])

.factory('chatMessageActions', function chatMessageActionsFactory(chatWebApiUtils, chatMessageDataUtils, chatServerActions) {
    var actions = {
        createMessage: createMessage
    };

    function createMessage(text) {
        return function(dispatch) {
            var message = chatMessageDataUtils.getCreatedMessageData(text);
            chatWebApiUtils.createMessage(message)
                .then(function(createdMessage) {
                    dispatch(chatServerActions.receiveCreatedMessage(createdMessage));
                })
        };
    };

    return actions;
});

