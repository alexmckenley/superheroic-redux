angular.module('shr.components.thread-list-item', [
	'shr.actions.chat-thread'
])

.directive('threadListItem', function threadListItemDirective() {
  return {
    bindToController: true,
    controller: 'ThreadListItemCtrl as ctrl',
    scope: {
        getCurrentThreadId: '&currentThreadId',
        getThread: '&thread'
    },
    templateUrl: 'components/thread-list-item/thread-list-item.tpl.html'
  };
})

.controller('ThreadListItemCtrl', function(chatThreadActions) {
	var ctrl = this;

	ctrl.selectThread = selectThread;

	function selectThread() {
		chatThreadActions.clickThread(this.getThread().id);
	}
});
