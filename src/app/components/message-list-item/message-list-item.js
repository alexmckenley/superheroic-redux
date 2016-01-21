angular.module('shr.components.message-list-item', [])

.directive('messageListItem', function messageListItemDirective() {
    return {
        bindToController: true,
        controller: 'MessageListItemCtrl as ctrl',
        scope: {
            getMessage: '&message'
        },
        templateUrl: 'components/message-list-item/message-list-item.tpl.html'
    };
})

.controller('MessageListItemCtrl', function() {});

