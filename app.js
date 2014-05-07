angular.module('CS670', []);

angular.module('CS670').controller('Main', ['$scope',
    function($scope) {
        $scope.map = {
            height: 500,
            width: 500
        };
        $scope.defaultRadius = Math.sqrt(Math.pow($scope.map.height / 10, 2) + Math.pow($scope.map.width / 10, 2)) / 2;
        $scope.circles = [];
        $scope.paths = [];

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
                r: r || $scope.defaultRadius
            })
        };

        $scope.addObstacles = function() {
            var numberOfCircles = 100;
            for (var i = 0; i < numberOfCircles; i++) {
                $scope.circles.push({
                    x: Math.random() * $scope.map.width,
                    y: Math.random() * $scope.map.height,
                    r: $scope.defaultRadius
                })
            }
        };

        $scope.getNaiveBinaryMatrixFromCanvasData = function(imageData) {
            var height = imageData.height,
                width = imageData.width,
                data = imageData.data,
                matrix = new Matrix({
                    height: height,
                    width: width
                });

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    var flatMatrixOffset = (i * width + j) * 4;
                    matrix[i][j] = (data[flatMatrixOffset] || data[flatMatrixOffset + 1] || data[flatMatrixOffset + 2] || data[flatMatrixOffset + 3]) ? 1 : 0;
                }
            }

            return matrix;
        }

        $scope.search = function() {
            var data = $scope.getContextData();
            var matrix = $scope.getNaiveBinaryMatrixFromCanvasData(data);
            matrix.transform(function(value, w, h) {
                return new Node({
                    obstacle: !! value
                });
            });

            var path = new aStarSearch().search(matrix);
            $scope.paths.push(path);
        };

        $scope.reset = function() {
            while ($scope.circles.length)
                $scope.circles.pop();
        }
    }
]);
