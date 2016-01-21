angular.module('shr.stores.thread', [
    'shr.actions.chat-server',
    'shr.actions.chat-thread',
    'shr.alt',
    'shr.utils.chat-message'
])

.factory('threadStore', function threadStoreFactory(alt, chatMessageUtils, chatServerActions, chatThreadActions) {
    function ThreadStore() {
        this.bindActions(chatThreadActions);
        this.bindActions(chatServerActions);

        this.currentID = null;
        this.threads = {};
    }

    ThreadStore.prototype = {
        constructor: ThreadStore,
        onClickThread: function (threadID) {
            this.currentID = threadID;
            this.threads[this.currentID].lastMessage.isRead = true;
        },

        onReceiveAll: function(rawMessages) {
            this._init(rawMessages);
        },

        _init: function(rawMessages) {
            var _this = this;

            rawMessages.forEach(function(message) {
                var threadID = message.threadID;
                var thread = _this.threads[threadID];
                if (thread && thread.lastTimestamp > message.timestamp) {
                    return;
                }
                _this.threads[threadID] = {
                    id: threadID,
                    name: message.threadName,
                    lastMessage: chatMessageUtils.convertRawMessage(message, _this.currentID)
                };
            });

            if (!this.currentID) {
                var allChrono = this.getInstance().getAllChrono();
                this.currentID = allChrono[allChrono.length - 1].id;
            }

            this.threads[this.currentID].lastMessage.isRead = true;
        }
    };

    ThreadStore.get = function(id) {
        return this.getState().threads[id];
    };

    ThreadStore.getAll = function() {
        return this.getState().threads;
    };

    ThreadStore.getAllChrono = function() {
        var threads = this.getState().threads;
        var orderedThreads = [];
        for (var id in threads) {
            var thread = threads[id];
            orderedThreads.push(thread);
        }
        orderedThreads.sort(function(a, b) {
            if (a.lastMessage.date < b.lastMessage.date) {
                return -1;
            } else if (a.lastMessage.date > b.lastMessage.date) {
                return 1;
            }
            return 0;
        });
        return orderedThreads;
    };

    ThreadStore.getCurrentID = function() {
        return this.getState().currentID;
    };

    ThreadStore.getCurrent = function() {
        var state = this.getState();
        var threads = state.threads;
        var currentID = state.currentID;
        return threads[currentID];
    };  

    return alt.createStore(ThreadStore, 'ThreadStore');
});
