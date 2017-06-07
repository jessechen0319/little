var SequencialTask = require("./SequencialTask");

function  TaskRunner (isSequencialTask, timeout) {
    this.tasks=[];
    this.timeOut = timeout?timeout:200;
    this.isPause = false;
    this.isSequencialTask = isSequencialTask;
    this.isBlocking = false;
    this.taskCostTime = new Date();
    this.currentlyProcesser = function () {
        console.log('default');
    };
    this.setTask = function(task){
        this.tasks.push(task);
    };
    var that = this;

    setInterval(function () {
        var everyTryTime = new Date();
        var time = everyTryTime.getDate() - that.taskCostTime.getDate()
        if(time > 150000){
            var timeSecond = time/1000;
            that.isBlocking = true;
        }
        if(that.tasks.length>0 && !that.isPause){
            that.isBlocking = false;
            that.taskCostTime = new Date();
            var task = that.tasks.shift();
            if(that.isSequencialTask = true && task instanceof SequencialTask){
                that.isPause = true;
                that.currentlyProcesser = task.processer;
                task.processer.apply();
                task.on('end', function () {
                    that.isPause = false;
                });
            } else {
                task.apply(that);
            }
        }
    }, this.timeOut);
}

module.exports = TaskRunner;