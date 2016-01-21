angular.module('shr.components.message-section', [
    'scroll-bottom',
    'shr.helpers.message'
])

.directive('messageSection', function messageSectionDirective() {
    return {
        scope: {},
        controller: 'MessageSectionCtrl as ctrl',
        templateUrl: 'components/message-section/message-section.tpl.html'
    };
})

.controller('MessageSectionCtrl', function(store, messageHelpers) {
    var ctrl = this;

    init();

    function init() {
        store.subscribe(getStateFromStore);

        getStateFromStore();
    }

    function getStateFromStore() {
        var state = store.getState(),
            messages = state.messageReducer.messages,
            threads = state.threadReducer.threads,
            currentID = state.threadReducer.currentID;

        ctrl.messages = messageHelpers.getAllForThread(messages, currentID);
        ctrl.thread = threads[currentID];
    }
});
