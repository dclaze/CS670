var aStarSearch = (function() {
    function aStarSearch() {};

    aStarSearch.prototype.search = function(matrix, startingPoint, endingPoint, heuristic) {
        this.heuristicType = heuristic || 'manhattan';
        var timer = new Timer();
        timer.start();
        this.heap = new BinaryHeap(function(node) {
            return node.f;
        });

        var startingNode = matrix[startingPoint.y][startingPoint.x];
        var endingNode = matrix[endingPoint.y][endingPoint.x];

        startingNode.h = this.heuristic(startingPoint.x, startingPoint.y, endingPoint.x, endingPoint.y);

        this.heap.push(startingNode);

        while (this.heap.size() > 0) {
            var currentNode = this.heap.pop();
            if (currentNode === endingNode) {
                return {
                    path: this.getPath(currentNode),
                    time: timer.stop()
                };
            }
            currentNode.closed = true;

            this.scoreNeighbors(matrix, currentNode, endingNode);
        }

        return {
            path: [],
            time: timer.stop
        }
    };

    aStarSearch.prototype.heuristic = function() {
        switch (this.heuristicType) {
            case "manhattan":
            default:{
                return this.manhattan.apply(this, arguments);
                break;
            }
        }
    };

    aStarSearch.prototype.manhattan = function(x1, y1, x2, y2) {
        var d1 = Math.abs(x2 - x1);
        var d2 = Math.abs(y2 - y1);
        return d1 + d2;
    }

    aStarSearch.prototype.getPath = function(node) {
        var curr = node;
        var path = [];
        while (curr.parent) {
            path.push(curr);
            curr = curr.parent;
        }
        return path.reverse();
    };

    aStarSearch.prototype.scoreNeighbors = function(matrix, currentNode, endingNode) {
        var width = matrix.getWidth(),
            height = matrix.getHeight();

        var processNode = function(node, heuristic, heap) {
            if (node.closed || node.obstacle) {
                return;
            }

            var gScore = currentNode.g + node.cost;
            var beenVisited = node.visited;

            if (!beenVisited || gScore < neighbor.g) {

                node.visited = true;
                node.parent = currentNode;
                node.h = node.h || heuristic(node.x, node.y, endingNode.x, endingNode.y);
                node.g = gScore;
                node.f = node.g + node.h;

                if (!beenVisited) {
                    heap.push(node);
                } else {
                    heap.rescoreElement(node);
                }
            }
        }

        for (var sy = -1; sy <= 1; sy++) {
            for (var sx = -1; sx <= 1; sx++) {
                var sxi = currentNode.x + sx;
                var syi = currentNode.y + sy;
                if (sxi >= 0 && syi >= 0 && sxi < width && syi < height && !(sxi == currentNode.x && syi == currentNode.y)) {
                    var neighbor = matrix[syi][sxi];
                    processNode(neighbor, this.heuristic.bind(this), this.heap);
                }
            }
        }
    }

    return aStarSearch;
})();
