angular.module('shr.actions.chat-server', [])

.factory('chatServerActions', function chatServerActionsFactory(alt) {
    function ChatServerActions() {
        this.generateActions('receiveCreatedMessage', 'receiveAll');
    }
    
    return alt.createActions(ChatServerActions);
});
