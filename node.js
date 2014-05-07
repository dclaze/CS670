var Node = (function() {
    function Node(params) {
        var params = params || undefined;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.f = params.f || 0;
        this.g = params.g || 0;
        this.h = params.h || 0;
        this.cost = params.cost || 0;
        this.closed = params.closed || false;
        this.visited = params.visited || false;
        this.obstacle = params.obstacle || false;
    };

    return Node;
})();
