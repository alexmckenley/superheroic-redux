angular.module('shr.stores.message', [
    'shr.actions.chat-thread',
    'shr.actions.chat-server',
    'shr.actions.chat-message',
    'shr.alt',
    'shr.stores.thread',
    'shr.utils.chat-message',
    'shr.utils.chat-message-data'
])

.factory('messageStore', function messsageStoreFactory(alt, chatMessageActions, chatMessageUtils, chatMessageDataUtils, chatServerActions, chatThreadActions, threadStore) {
    function MessageStore() {
        this.bindActions(chatThreadActions);
        this.bindActions(chatMessageActions);
        this.bindActions(chatServerActions);

        this.messages = {};
    }

    MessageStore.prototype = {
        constructor: MessageStore,
        onCreateMessage: function(text) {
            var message = chatMessageDataUtils.getCreatedMessageData(text);
            this.messages[message.id] = message;
        },

        onReceiveAll: function(rawMessages) {
            this._addMessages(rawMessages);
            this.waitFor([threadStore.dispatchToken]);
            this._markAllInThreadRead(threadStore.getCurrentID());
        },

        onClickThread: function() {
            this.waitFor([threadStore.dispatchToken]);
            this._markAllInThreadRead(threadStore.getCurrentID());
        },

        _addMessages: function(rawMessages) {
            var _this = this;

            rawMessages.forEach(function(message) {
                if (!_this.messages[message.id]) {
                    _this.messages[message.id] = chatMessageUtils.convertRawMessage(
                        message,
                        threadStore.getCurrentID()
                        );
                }
            });
        },

        _markAllInThreadRead: function(threadID) {
            for (var id in this.messages) {
                if (this.messages[id].threadID === threadID) {
                    this.messages[id].isRead = true;
                }
            }
        }
    };

    MessageStore.getAllForThread = function(threadID) {
        var threadMessages = [];
        var _messages = this.getState().messages;
        for (var id in _messages) {
            if (_messages[id].threadID === threadID) {
                threadMessages.push(_messages[id]);
            }
        }
        threadMessages.sort(function(a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        return threadMessages;
    };

    MessageStore.getAllForCurrentThread = function() {
        return this.getAllForThread(threadStore.getCurrentID());
    };

    MessageStore.get = function(id) {
        return this.getState().messages[id];
    };

    MessageStore.getAll = function() {
        return this.getState().messages;
    };

    return alt.createStore(MessageStore, 'MessageStore');
});
