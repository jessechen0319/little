/**
 * Created by jesse on 2017/6/5.
 */
var TaskRunner = require("../TaskRunner");
var getContent = require("./GetHtmlContent");
var http = require('http');
var cheerio = require('cheerio');

var urls = [];

var taskRunner = new TaskRunner(false, 2000);

urls.forEach(function (p1, p2, p3) {
    function fetch(){

        getContent.download(p1, function (data) {
            if(data != null){
                var $ = cheerio.load(data);
                console.log(p1);
                console.log($("title").text());
            }
        });
    }

    taskRunner.setTask(fetch);
});

