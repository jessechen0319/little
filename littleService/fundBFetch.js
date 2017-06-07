var http = require('http');
var GetContent = require("../tests/GetHtmlContent");

var now = new Date();
var nowValue = Date.parse(now);


var nowValue = Date.parse(now);
GetContent.download(`http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=9&letter=&gsid=0&text=B&sort=zdf,desc&page=1,100&dt=${nowValue}&atfc=`, function(result){
    if(result){
        eval(result);
        db.datas.forEach(function(fund, index) {
            console.log('--------------------');
            console.log(`基金ID-${index}`)
            console.log(`基金名称-${fund[1]}:${fund[0]}`);
            console.log(`基金价格-${fund[5]}`);
            console.log('********************');
        }, this);
        //result.apply();
        // var splitedResult = result.split('=');
        // if(splitedResult && splitedResult instanceof Array && splitedResult.length == 2){
        //     var jsonString = splitedResult[1];
        //     var json = JSON.parse(jsonString);
        //     console.log(json);
        // }
    }
});