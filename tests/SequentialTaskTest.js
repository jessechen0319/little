/**
 * Created by jesse on 2017/5/31.
 */
//instance test
var SequencialTask = require("../SequencialTask");
var TaskRunner = require("../TaskRunner");

exports.testInstance = function(test) {
    var sequencialTask = new SequencialTask();
    var isIntanceOk = sequencialTask instanceof SequencialTask;
    test.ok(isIntanceOk, 'the instance is OK for correct instance');
    var dateInstance = new Date();
    var isInstanceFail = dateInstance instanceof SequencialTask;
    test.ok(!isInstanceFail, "the instance is fail for date")
    test.done();
};

exports.testLongProcesser = function (test) {
    var ok = true;
    console.log(TaskRunner);
    var taskRunner = new TaskRunner(true, 200);
    var sequencialTask = new SequencialTask();
    sequencialTask.setProcesser(function () {
        setTimeout(function () {
            test.ok(taskRunner.isBlocking, "Blocking Now");
            sequencialTask.end();
            test.done()
        }, 150020);
    });

    taskRunner.setTask(sequencialTask);
}