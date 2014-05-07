function Timer() {
    this.startTime = null;
}
Timer.prototype = {
    start: function() {
        this.startTime = new Date();
        return this.startTime;
    },
    stop: function() {
        var now = new Date();
        return now - this.startTime;
    }
};
