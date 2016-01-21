angular.module('shr.actions.chat-message', [])

.factory('chatMessageActions', function chatMessageActionsFactory(alt, chatWebApiUtils, chatMessageDataUtils) {
    function ChatMessageActions() {}

    ChatMessageActions.prototype = {
        createMessage: function(text) {
            return function(dispatch) {
                dispatch(text);

                var message = chatMessageDataUtils.getCreatedMessageData(text);
                chatWebApiUtils.createMessage(message);
            };
        }
    };

    return alt.createActions(ChatMessageActions);
});

