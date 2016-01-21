angular.module('shr.root-reducer', [
    'shr.reducers.message',
    'shr.reducers.thread'
])

.factory('rootReducer', function(messageReducer, threadReducer) {
    return Redux.combineReducers({
        messageReducer: messageReducer,
        threadReducer: threadReducer
    });
});
