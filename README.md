# koa-spider

Node.js 下载漫画图片,图片的名称按照漫画的顺序命名

## 适用范围

漫画 url 有明显的规律,比如：

```
http://aaaaaaaaa/xemh/491.html,
http://aaaaaaaaa/xemh/491_2.html,
http://aaaaaaaaa/xemh/491_3.html,
```

## 转换成 cbz，mobi，epub 漫画

1. 把图片压缩成 zip 包
2. 安装 Kindle Comic Converter，选择 zip 包转换,
   下载地址链接：http://pan.baidu.com/s/1pLyPlz1 密码：wip3
3. 生成对应的漫画文件

## 项目说明

-   使用 koa2.x，nodejs>=7.6,
-   使用 async await 解决异步，
-   使用 request-promise 配合 async await 解决请求异步
-   使用 cheerio 处理选择 img 标签

## 安装 Node.js >= 7.6

http://nodejs.org/download/

## 安装依赖包

npm install

## 运行程序

npm start
