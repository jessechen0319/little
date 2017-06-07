/**
 * Created by jesse on 2017/5/31.
 */

var util = require('util');
var events = require('events');

function SequencialTask() {

    var SequencialTaskClass = this;
    /*
    *
    * default process
    * */
    this.processer = function () {
        SequencialTaskClass.begin();
        SequencialTaskClass.end();
    };
    this.begin = function () {
        SequencialTaskClass.emit("begin");
    };

    this.end = function () {
        SequencialTaskClass.emit("end");
    };

    this.setProcesser = function (processer) {
        SequencialTaskClass.processer = processer;
    };
}

util.inherits(SequencialTask, events.EventEmitter);

module.exports = SequencialTask;

