angular.module('CS670', []);

angular.module('CS670').controller('Main', ['$scope', '$http',
    function($scope, $http) {
        $scope.map = {
            height: 600,
            width: 600
        };
        $scope.defaultRadius = Math.sqrt(Math.pow($scope.map.height / 10, 2) + Math.pow($scope.map.width / 10, 2)) / 2;
        $scope.circles = [];
        $scope.paths = [];
        $scope.runTime = 0.0;
        $scope.scale = 1;
        $scope.heuristics = [{
            name: 'Manhattan Distance',
            type: 'manhattan'
        }]

        $scope.$watch('scale', function(scale) {
            if (scale && scale > 0) {
                $scope.defaultRadius = Math.sqrt(Math.pow($scope.map.height / (15 - scale), 2) + Math.pow($scope.map.width / (15 - scale), 2)) / 2;
            }
        })

        $scope.startingPoint = {
            x: 0,
            y: $scope.map.height - 1
        };
        $scope.endingPoint = {
            x: $scope.map.width - 1,
            y: 0
        };

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
                    x: h,
                    y: w,
                    obstacle: !! value,
                    cost: !! value ? 0 : 1
                });
            });

            var result = new aStarSearch().search(matrix, $scope.startingPoint, $scope.endingPoint, $scope.heuristic.type || 'manhattan')
            $scope.runTime = result.time;
            var path = result.path.map(function(node) {
                return [node.x, node.y];
            });
            $scope.paths.push(path);
        };

        $scope.reset = function() {
            while ($scope.circles.length)
                $scope.circles.pop();
            while ($scope.paths.length)
                $scope.paths.pop();
            $scope.runTime = 0.0;
        };

        $scope.sendToDrone = function() {
            $http.get('http://localhost:3111/executePath?path=' + JSON.stringify($scope.paths[0]), {
                data: $scope.path
            }).success(function() {
                console.log("Success");
            })
                .error(function() {
                    console.log("Fail");
                });
        };
    }
]);
