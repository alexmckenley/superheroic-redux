angular.module('shr.store', [
    'shr.root-reducer'
])

.factory('store', function storeFactory(rootReducer) {
    var createStoreWithMiddleware = Redux.applyMiddleware(
        thunkMiddleware
    )(Redux.createStore);

    function thunkMiddleware(obj) {
        return function(next) {
            return function(action) {
                if (typeof action === 'function') {
                    action(obj.dispatch, obj.getState);
                } else {
                    next(action);
                }
            };
        };
    }

    return createStoreWithMiddleware(rootReducer);
});
