angular.module('shr', [
    'shr.actions',
    'shr.store',
    'shr.components',
    'shr.chat-example-data',
    'templates-app',
    'templates-common',
    'ui.router'
])

.config(function ($stateProvider) {
    $stateProvider.state('shr', {
        url: '',
        templateUrl: 'app.tpl.html',
        onEnter: function(store, chatServerActions) {
            store.dispatch(chatServerActions.fetchAll());
        }
    });
})

.run(function ($rootScope, chatExampleData) {
    chatExampleData.init(); // load example data into localstorage

    $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
        $log.error('Error in state transistion: ', error);
    });
});
