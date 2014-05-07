angular.module('CS670').directive('canvasRectangle', function() {
    return {
        scope: {
            context: '=context',
            rectangle: '=rectangle'
        },
        link: function(scope, element, attrs, ngModelCtrl) {
            scope.$watch('context', function(newContext) {
                if (!newContext)
                    return;

                scope.context.rect(scope.rectangle.x, scope.rectangle.y, scope.rectangle.width || 30, scope.rectangle.height || 30);
                scope.context.stroke();

                scope.$on('$destroy', function() {
                    scope.context.clearRect(scope.rectangle.x, scope.rectangle.y, scope.rectangle.width, scope.rectangle.height);
                });
            });
        }
    };
});
