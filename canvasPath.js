angular.module('CS670').directive('canvasPath', function() {
    return {
        scope: {
            context: '=context',
            path: '=path'
        },
        link: function(scope, element, attrs, ngModelCtrl) {
            scope.context.beginPath();
            scope.context.strokeStyle = 'red';
            for (var i = 0; i < scope.path.length; i++) {
                var point = scope.path[i];
                if (i == 0)
                    scope.context.moveTo(point[0], point[1]);
                else
                    scope.context.lineTo(point[0], point[1]);
            }
            scope.context.stroke();

            scope.$on('$destroy', function() {
                var path = scope.path;
                if (!path)
                    return;

                var x = path[0][0],
                    y = path[0][1],
                    width = path[path.length - 1][0] - x
                    height = path[path.length - 1][1] - y;
                scope.context.clearRect(x, y, width, height);
            })
        }
    };
});
