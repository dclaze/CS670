angular.module('CS670').directive('easyCanvas', function() {
    return {
        link: function(scope, element, attrs, ngModelCtrl) {
            var element = element[0],
                context = element.getContext("2d");

            scope.context = context;

            scope.getContextData = function() {
                return scope.context.getImageData(0, 0, element.width, element.height);
            }
        }
    };
});
