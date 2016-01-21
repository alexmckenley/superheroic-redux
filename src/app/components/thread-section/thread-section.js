angular.module('shr.components.thread-section', [
    'shr.store',
    'shr.helpers.thread'
])

.directive('threadSection', function threadSectionDirective() {
    return {
        scope: {},
        controller: 'ThreadSectionController as ctrl',
        templateUrl: 'components/thread-section/thread-section.tpl.html'
    };
})

.controller('ThreadSectionController', function(store, threadHelpers) {
    var ctrl = this;

    init();

    function init() {
        store.subscribe(getStateFromStore);

        getStateFromStore();
    }

    function getStateFromStore() {
        var state = store.getState(),
            threads = state.threadReducer.threads,
            currentID = state.threadReducer.currentID;

        ctrl.currentThreadId = currentID;
        ctrl.threads = threadHelpers.getAllChrono(threads);
        ctrl.unreadCount = threadHelpers.getUnreadCount(threads);
    }
});
