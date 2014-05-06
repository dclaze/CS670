angular.module('CS670', []);

angular.module('CS670').controller('Main', ['$scope',
    function($scope) {
            $scope.map = {
                height: 500,
                width: 500
            };
        $scope.addObstacles = function() {

            $scope.circles = [{
                x: "10",
                y: "20",
                r: "5"
            }, {
                x: "40",
                y: "50",
                r: "3"
            }];
        }
    }
]);
