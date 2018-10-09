/*爬虫简单封装*/
const fs = require("fs");
/*文本和图片*/
exports.writeFile = (filename,data,encoding) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(filename,data,encoding?encoding:"utf-8",err => {
            if (err) {
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
        fs.writeFile(filename,data,"utf-8",err => {
            if ( err ) {
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
        fs.writeFile(filename,data,"binary",err => {
            if ( err ) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};
