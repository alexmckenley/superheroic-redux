angular.module( 'scroll-bottom', [] )

.directive( 'scrollBottom', function($timeout) {
    return {
        scope: {
            scrollBottom: "="
        },
        link: function ($scope, $element) {
            $scope.$watchCollection('scrollBottom', function (newValue) {
                if (newValue) {
                    // wrap in $timeout to make sure digest is completed before adjusting scroll
                    $timeout(function() {
                        $element[0].scrollTop = $element[0].scrollHeight;
                    }, 0);
                }
            });
        }
    };
});

