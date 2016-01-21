angular.module('shr.stores.unread-thread', [
    'shr.actions.chat-server',
    'shr.actions.chat-thread',
    'shr.stores.message',
    'shr.stores.thread'
])

.factory('unreadThreadStore', function unreadThreadStoreFactory(alt, chatServerActions, chatThreadActions, messageStore, threadStore) {
    function UnreadThreadStore() {
        this.bindActions(chatThreadActions);
        this.bindActions(chatServerActions);
    }

    UnreadThreadStore.prototype = {
        constructor: UnreadThreadStore,
        onClickThread: function(threadID) {
            this.wait();
        },

        onReceiveAll: function(rawMessages) {
            this.wait();
        },

        wait: function() {
            this.waitFor([
                threadStore.dispatchToken,
                messageStore.dispatchToken
            ]);
        }
    };

    UnreadThreadStore.getCount = function() {
        var threads = threadStore.getAll();
        var unreadCount = 0;
        for (var id in threads) {
            if (!threads[id].lastMessage.isRead) {
                unreadCount++;
            }
        }
        return unreadCount;
    };
    
    return alt.createStore(UnreadThreadStore, 'UnreadThreadStore');
});

