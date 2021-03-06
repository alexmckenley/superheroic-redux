angular.module('shr.components.message-composer', [
    'shr.actions.chat-message',
    'shr.store'
])

.directive('messageComposer', function messageComposerDirective() {
    return {
        controller: 'MessageComposerCtrl as ctrl',
        scope: {},
        templateUrl: 'components/message-composer/message-composer.tpl.html'
    };
})

.controller('MessageComposerCtrl', function(store, chatMessageActions) {
    var ctrl = this,
        ENTER_KEY_CODE = 13;

    ctrl.handleKeypress = handleKeypress;

    function handleKeypress(event) {
        if (event.keyCode === ENTER_KEY_CODE && ctrl.text) {
            event.preventDefault();
            store.dispatch(chatMessageActions.createMessage(ctrl.text, store.getState().threadReducer.currentID));

            // two-way data binding makes it easy to deal with the textarea value here.
            ctrl.text = '';
        }
    }
});

