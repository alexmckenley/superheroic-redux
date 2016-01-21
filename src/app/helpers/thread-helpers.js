angular.module('shr.helpers.thread', [])

.factory('threadHelpers', function threadHelpersFactory() {
    var helpers = {
        getAllChrono: getAllChrono,
        getUnreadCount: getUnreadCount
    };

    function getAllChrono(threads) {
        return _(threads)
            .sortBy(function(thread) { return thread.lastMessage.date; })
            .value();
    }

    function getUnreadCount(threads) {
        return _(threads)
            .filter({ isRead: false })
            .size();
    }

    return helpers;
});
