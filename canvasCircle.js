angular.module('CS670').directive('canvasCircle', function() {
    return {
        scope: {
            context: '=context',
            scale: '=scale',
            x: '=cx',
            y: '=cy',
            r: '=cr'
        },
        link: function(scope, element, attrs, ngModelCtrl) {
            var padding = 1/scope.scale * scope.r;
            scope.context.beginPath();
            scope.context.arc(scope.x, scope.y, scope.r + padding, 0, 2 * Math.PI);
            scope.context.fillStyle = "gray"
            scope.context.fill();
            scope.context.stroke();

            scope.context.beginPath();
            scope.context.arc(scope.x, scope.y, scope.r, 0, 2 * Math.PI);
            scope.context.fillStyle = "black"
            scope.context.fill();
            scope.context.stroke();

            scope.$on('$destroy', function() {
                scope.context.beginPath();
                scope.context.clearRect(scope.x - scope.r - 1, scope.y - scope.r - 1, scope.r * 2 + 2, scope.r * 2 + 2);
                scope.context.closePath();
            })
        }
    };
});
