const fs = require("fs");
const request = require("request-promise");
const cheerio = require("cheerio");
const mkdirp = require("mkdirp");

const dir = "images";
mkdirp(dir);
let links = [];
let downloadTask = [];
exports.download = (async function() {
    let body = await request("https://price.pcauto.com.cn/cars/sg3895/");

    var $ = cheerio.load(body);
    $(".imgWrap img").each(function(index) {
        var src = $(this).attr("#src");
        links.push(index + "___" + "http:" + src);
    });
    links.map(item => {
        let index = item.split("___")[0];
        let src = item.split("___")[1];
        downloadTask.push(
            "http:" + downloadImg(src, dir, index + item.substr(-4, 4))
        );
    });
})();

async function downloadImg(url, dir, filename) {
    console.log("开始下载...", url);
    request
        .get(url)
        .pipe(fs.createWriteStream(dir + "/" + filename))
        .on("close", function() {
            console.log("下载完成...", url);
        });
}

// getHtml();
