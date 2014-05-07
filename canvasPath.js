angular.module('CS670').directive('canvasPath', function() {
    return {
        scope: {
            context: '=context',
            path: '=path'
        },
        link: function(scope, element, attrs, ngModelCtrl) {
            scope.context.beginPath();

            for (var i = 0; i < scope.path.length; i++) {
                var point = scope.path[i];
                if (i == 0)
                    scope.context.moveTo(point[0], point[1]);
                else
                    scope.context.lineTo(point[0], point[1]);
            }
            scope.context.stroke();

            // scope.$on('$destroy', function() {
            //     scope.context.beginPath();
            //     scope.context.clearRect(scope.x - scope.r - 1, scope.y - scope.r - 1, scope.r * 2 + 2, scope.r * 2 + 2);
            //     scope.context.closePath();
            // })
        }
    };
});
