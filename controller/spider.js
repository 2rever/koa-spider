const fs = require("fs");
const request = require("request-promise");
const cheerio = require("cheerio");
const mkdirp = require("mkdirp");
const config = require("../config");
exports.download = async function(ctx, next) {
    const dir = "images";
    // 图片链接地址
    let links = [];
    // 创建下载的文件夹
    mkdirp(dir);
    var urls = [];
    let tasks = [];
    // 下载地址的数组
    let downloadTask = [];
    // 下载的资源的数组
    let url = config.url;
    // 获取要下载的网站地址
    // 重新拼接要下载的
    for (var i = 1; i <= config.size; i++) {
        let link = url + "_" + i + ".html";
        if (i == 1) {
            link = url + ".html";
        }
        tasks.push(getResLink(i, link));
    }
    links = await Promise.all(tasks);
    console.log("hahahaha");
    console.log(links);
    console.log("links==========", links.length);

    for (var i = 0; i < links.length; i++) {
        let item = links[i];
        console.log("====");
        console.log(item);
        console.log("====");
        let index = item.split("___")[0];
        let src = item.split("___")[1];
        downloadTask.push(
            downloadImg(src, dir, index + links[i].substr(-4, 4))
        );
    }
    await Promise.all(downloadTask);
};

// 下载函数
async function downloadImg(url, dir, filename) {
    console.log("download begin---", url);
    request
        .get(url)
        .pipe(fs.createWriteStream(dir + "/" + filename))
        .on("close", function() {
            console.log("download success", url);
        });
}

// 获取图片路径函数
async function getResLink(index, url) {
    const body = await request(url);
    // 获取资源体
    let urls = [];
    var $ = cheerio.load(body);
    // 解析html结构
    $(config.rule).each(function() {
        var src = $(this).attr("src");
        urls.push(src);
    });
    // 遍历选择到的图片，并把图片地址取出放到数组里
    const info = index + "___" + urls[0];
    return info;
}
