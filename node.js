var Node = (function() {
    function Node(params) {
        var params = params || undefined;
        this.f = params.f || 0;
        this.g = params.g || 0;
        this.h = params.h || 0;
        this.obstacle = params.obstacle || false;
    };

    return Node;
})();
