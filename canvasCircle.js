angular.module('CS670').directive('canvasCircle', function() {
    return {
        scope: {
            context: '=context',
            x: '=cx',
            y: '=cy',
            r: '=cr'
        },
        link: function(scope, element, attrs, ngModelCtrl) {
            scope.context.beginPath();
            scope.context.arc(scope.x, scope.y, scope.r, 0, 2 * Math.PI);
            scope.context.stroke();
        }
    };
});