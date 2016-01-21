angular.module('shr.reducers.message', [
    'shr.actions.chat-server',
    'shr.utils.chat-message'
])

.factory('messageReducer', function messageReducerFactory(chatServerActions, chatMessageUtils) {
    function addMessages(rawMessages) {
        return _(rawMessages)
            .groupBy('id')
            .mapValues(function(message) {
                return chatMessageUtils.convertRawMessage(message[0]);
            })
            .value();
    }

    return function messageReducer(state, action) {
        var initialState = { messages: [] };
        if (typeof state === 'undefined') {
            return initialState;
        }

        switch (action.type) {
            case chatServerActions.RECEIVE_CREATED_MESSAGE:
                var newState = angular.copy(state);
                newState.messages[action.message.id] = action.message;
                return newState;
            case chatServerActions.RECEIVE_ALL:
                return { messages: addMessages(action.messages) };
            default:
                return state;
        }
    };
});
