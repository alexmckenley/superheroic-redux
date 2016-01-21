angular.module('shr', [
    'shr.actions',
    'shr.alt',
    'shr.stores',
    'shr.actions',
    'shr.components',
    'shr.utils',
    'shr.chat-example-data',
    'templates-app',
    'templates-common',
    'ui.router'
])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('shr', {
        url: '',
        templateUrl: 'app.tpl.html',
        onEnter: function(chatWebApiUtils) {
            chatWebApiUtils.getAllMessages();
        }
    });
})

.run(function ($rootScope, chatExampleData) {
    chatExampleData.init(); // load example data into localstorage

    $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
        $log.error('Error in state transistion: ', error);
    });
});
