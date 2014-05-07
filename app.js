angular.module('CS670', []);

angular.module('CS670').controller('Main', ['$scope',
    function($scope) {
        $scope.map = {
            height: 500,
            width: 500
        };

        $scope.circles = [];

        $scope.placeCircle = function(event) {
            if (!$scope.enableAddingObstacles)
                return;

            var x = event.offsetX,
                y = event.offsetY;
            $scope.addObstacle(x, y);
        };

        $scope.addObstacle = function(x, y, r) {
            $scope.circles.push({
                x: x,
                y: y,
                r: r || 15
            })
        };

        $scope.addObstacles = function() {
            var numberOfCircles = 1;
            for (var i = 0; i < numberOfCircles; i++) {
                $scope.circles.push({
                    x: Math.random() * $scope.map.width,
                    y: Math.random() * $scope.map.height,
                    r: 15
                })
            }
        };

        $scope.reset = function() {
            while ($scope.circles.length)
                $scope.circles.pop();
        }
    }
]);
