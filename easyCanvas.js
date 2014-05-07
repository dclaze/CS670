angular.module('CS670').directive('easyCanvas', function() {
    return {
        link: function(scope, element, attrs, ngModelCtrl) {
            var element = element[0],
                context = element.getContext("2d");

            scope.context = context;
        }
    };
});
