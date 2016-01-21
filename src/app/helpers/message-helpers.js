angular.module('shr.helpers.message', [])

.factory('messageHelpers', function messageHelpersFactory() {
    var helpers = {
        getAllForThread: getAllForThread
    };

    function getAllForThread(messages, threadID) {
        return _(messages)
            .filter({ threadID: threadID })
            .sortBy('date')
            .value();
    }

    return helpers;
});
