/*
在HTTP中我们可以通过http的get和request就请求外网服务器的数据。
*/
//第一步引入http和fs原生模块
const http = require("http");
const fs = require("fs");
const file = require("./file");
//第二步：抓取地址
const url = "http://www.luoo.net/music/882";
/*
第三步关于网页的解析---获取想要的数据，进行数据的分析和抓取，找素材
安装:npm i cheerio --S
cheerio模仿jquery
*/
const cheerio = require("cheerio");

http.get(url,res => {
    var html = "";
    /*data是代表请求数据进行中，管道 fs网络字节流，data是读取一部分返回的数据字节Buffer对象*/
    res.on("data",data => {
        html += data.toString("utf-8");
    });
    /*如果.on("data") 如果执行完毕，就会来触发.on("end")的事件*/
    res.on("end",() => {
        parseHtml(html);//开始解析
    });
    res.on("error",err => {
        console.log("读取网页【"+url+"】失败....");
    });
});

function parseHtml(html){
    //将源代码加载到cheerio准备解析
    const $ = cheerio.load(html,{decodeEntities:false});
    /*const title = $("title").text();*/
    const title = $(".vol-title").text();
    console.log(title);
    /*带格式的文本：decodeEntities:false*/
    const content = $(".vol-desc").html();
    console.log(content);
    const $imgs = $("body").find("img");
    for ( let i = 0 ; i < $imgs.length ; i++ ) {
        const src = $($imgs[i]).attr("src");
        if ( src.indexOf("img-cdn") !== -1 ) {
            downloadImage("D:/test/" + (Math.random() * 1000) + ".jpg", src);
        }
    }
};

/*图片下载*/
function downloadImage(pathname,url) {
    http.get(url,res =>{
        res.setEncoding('binary');  //二进制binary
        let imgdata = "";
        res.on("data",(data) => {
            imgdata += data;
        }).on("end",() => {
            file.writeFileBinary(pathname,imgdata).then(() => {
                console.log(url+"下载成功!");
            }).catch(() => {
                console.log(url+"下载失败!");
            });
        }).on("error",() => {
            console.log("读取失败...");
        });
    });
};
