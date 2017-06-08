// var urlTools = `https://gupiao.baidu.com/api/stocks/stockdaybar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=sh601016&step=3&start=&count=160&fq_type=front&timestamp=1496846898371`;
// var urlStocksPage1 = `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=1&num=40&sort=symbol&asc=1&node=hs_a&symbol=&_s_r_a=init`;
// var urlStocksPage80 = `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=80&num=40&sort=symbol&asc=1&node=hs_a&symbol=&_s_r_a=page`;
var process = function(stockFullInformation){
    console.log(stockFullInformation);
};

function setProcesser(processer){
    process = processer;
}

function run(){
    var urls = [];

    for(var i = 1; i<=80; i++){
        var url = `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=${i}&num=40&sort=symbol&asc=1&node=hs_a&symbol=&_s_r_a=init`;
        urls.push(url);
    }

    var SequencialTask = require("../SequencialTask");
    var TaskRunner = require("../TaskRunner");
    var HtmlGetter = require("../tools/GetHtmlContent")
    var taskRunner = new TaskRunner(true, 100);


    urls.forEach((url, indexOrg)=>{
        var sequencialTask = new SequencialTask();
        var now = new Date();
        var nowValue = Date.parse(now);

        function commonProcess(){
            HtmlGetter.download(url, (data)=>{
                data = "var stockBasicInformation = " + data;
                eval(data);
                
                stockBasicInformation.forEach((stock, index)=>{
                    let isLastOne = index == stockBasicInformation.length-1;
                    let kLineURL = `https://gupiao.baidu.com/api/stocks/stockdaybar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=sh601016&step=3&start=&count=160&fq_type=front&timestamp=${nowValue}`;
                    var fetchStockKLineTask = new SequencialTask();
                    function fetchKLine(){
                        HtmlGetter.downloadHttps(kLineURL, (kLineData)=>{
                            kLineData = "var kLineDataObj = "+kLineData;
                            eval(kLineData);
                            stock.kLineData = kLineDataObj;
                            process(stock);
                            fetchStockKLineTask.end();
                            if(taskRunner.tasks.length==0){
                                taskRunner.interrupt();
                            }
                        }, true);
                    }
                    
                    fetchStockKLineTask.setProcesser(fetchKLine);
                    taskRunner.setTask(fetchStockKLineTask);
                    if(isLastOne){
                        sequencialTask.end();
                    }
                });
                console.log(`fetching-${indexOrg}`);
            });
        }

        sequencialTask.setProcesser(commonProcess);
        taskRunner.setTask(sequencialTask);
    });
}

exports.run = run;
exports.setProcesser = setProcesser;

run();


