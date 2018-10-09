//第一步引入http和fs原生模块
const http = require("http");
const fs = require("fs");
const file = require("./file");
//第二步：抓取地址
const url = "http://www.luoo.net/music/882";
//get/post
http.get(url,res => {
    let html = "";
    //data是代表请求数据进行中，管道 fs网络字节流，data是读取一部分返回的数据字节Buffer对象
    res.on("data",data => {
        html += data.toString("utf-8");
    });

    //如果.on("data") 如果执行完毕，就会来触发.on("end")的事件
    res.on("end",() => {
        file.writeFile("D:/test/882.html",html).then(() => {
            console.log("success")
        }).catch(() => {
            console.log("fail")
        });
    });

    res.on("error",err => {
        console.log("读取网页【"+url+"】失败....");
    });
});
