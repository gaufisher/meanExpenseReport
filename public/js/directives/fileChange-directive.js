'use strict';

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

// app.directive('customOnChange', [function() {
//     return {
//         restrict: "A",
//         scope: {
//             handler: '&'
//         },
//         link: function(scope, element){
//
//             element.change(function(event){
//                 scope.$apply(function(){
//                     var params = {event: event, el: element};
//                     scope.handler({params: params});
//                 });
//             });
//         }
//     };
// }]);
