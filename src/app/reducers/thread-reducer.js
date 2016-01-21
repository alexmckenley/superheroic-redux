angular.module('shr.reducers.thread', [
    'shr.actions.chat-server',
    'shr.actions.chat-thread',
    'shr.utils.chat-message',
    'shr.helpers.thread'
])

.factory('threadReducer', function threadReducerFactory(chatServerActions, chatThreadActions, chatMessageUtils, threadHelpers) {
    function handleReceiveAll(state, rawMessages) {
        var currentID,
            threads;

        threads = _(rawMessages)
            .groupBy('threadID')
            .mapValues(function(messages) {
                return {
                    id: messages[0].threadID,
                    name: messages[0].threadName,
                    isRead: false,
                    lastMessage: chatMessageUtils.convertRawMessage(_.maxBy(messages, 'timestamp'), messages[0].threadID)
                };
            })
            .value();

        currentID = state.currentID || _.last(threadHelpers.getAllChrono(threads)).id;

        threads[currentID].isRead = true;

        return {
            threads: threads,
            currentID: currentID
        };
    }

    function handleClickThread(state, threadID) {
        state.threads[threadID].isRead = true;

        return {
            threads: state.threads,
            currentID: threadID
        };
    }

    return function threadReducer(state, action) {
        var initialState = {
            threads: {},
            currentId: null
        };

        if (typeof state === 'undefined') {
            return initialState;
        }

        switch (action.type) {
            case chatServerActions.RECEIVE_ALL:
                return handleReceiveAll(angular.copy(state), action.messages);
            case chatThreadActions.CLICK_THREAD:
                return handleClickThread(angular.copy(state), action.id);
            default:
                return state;
        }
    };
});
