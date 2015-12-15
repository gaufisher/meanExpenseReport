'use strict';

/* Binds the enter key to be use as a directive. */
angular.module('QuickrBooks').directive('enter', [function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.enter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
}]);