# node-simple-reptile（简单node爬虫）

http.get(options[, callback])：http://nodejs.cn/api/http.html#http_http_get_options_callback 

fs.writeFile(file, data[, options],callback)：http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback
* filename 文件的绝对路径
 * data 写入的内容，可以字符串也可以二进制数据
 * encoding 编码，utf-8，那么代表就是一定是写入文本，如果写入二进制数据，比如图片，文件等，那么这个时候就不能设置utf-8,而是 "binary"
 
### 爬虫简单封装
```
const fs = require("fs");
/*文本和图片*/
exports.writeFile = (filename,data,encoding) => {
    return new Promise((resolve,reject)=>{
        fs.writeFile(filename,data,encoding?encoding:"utf-8",(err) => {
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
};

/*写入文本*/
exports.writeFileText = (filename,data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(filename,data,"utf-8",(err) => {
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
};

/*写入图片*/
exports.writeFileBinary = (filename,data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(filename,data,"binary",(err) => {
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
};
```

### Demo-01 文本
* 在HTTP中我们可以通过http的get和request就请求外网服务器的数据。
```
//第一步引入http和fs原生模块
const http = require("http");
const fs = require("fs");
const file = require("./file");

//第二步：抓取地址
const url = "http://www.luoo.net/music/882";

//get/post
http.get(url,(res) => {
    let html = "";
    //data是代表请求数据进行中，管道 fs网络字节流，data是读取一部分返回的数据字节Buffer对象
    res.on("data",(data) => {
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

    res.on("error",(err) => {
        console.log("读取网页【"+url+"】失败....");
    });
});
```

### Demo-02 图片
```
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

http.get(url,(res) => {
    var html = "";
    //data是代表请求数据进行中，管道 fs网络字节流，data是读取一部分返回的数据字节Buffer对象
    res.on("data",(data) => {
        html += data.toString("utf-8");
    });
    //如果.on("data") 如果执行完毕，就会来触发.on("end")的事件
    res.on("end",() => {
       parseHtml(html);//开始解析
    });
    res.on("error",(err) => {
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
        if ( src.indexOf("img-cdn") != -1 ) {
            downloadImage("D:/test/" + (Math.random() * 1000) + ".jpg", src);
        }
    }
};

/*图片下载*/
function downloadImage(pathname,url){
    http.get(url,(res)=>{
        res.setEncoding('binary');  //二进制binary
        let imgdata = "";
        res.on("data",(data) => {
           imgdata+=data;
        }).on("end",() => {
            file.writeFileBinary(pathname,imgdata).then(() => {
                console.log(url+"下载成功!");
            }).catch(()=> {
                console.log(url+"下载失败!");
            });
        }).on("error",() => {
            console.log("读取失败...");
        });
    });
};
```
