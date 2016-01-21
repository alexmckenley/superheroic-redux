angular.module('shr.stores', [
    'shr.stores.message',
    'shr.stores.thread',
    'shr.stores.unread-thread'
])

.run(function(messageStore, threadStore, unreadThreadStore) {});
