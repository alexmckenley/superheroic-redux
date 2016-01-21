angular.module('shr.actions.chat-thread', [])

.factory('chatThreadActions', function chatThreadActionsFactory() {
    var actions = {
        clickThread: clickThread,
        CLICK_THREAD: 'CLICK_THREAD'
    };

    function clickThread(id) {
        return {
            type: 'CLICK_THREAD',
            id: id
        };
    }

    return actions;
});

