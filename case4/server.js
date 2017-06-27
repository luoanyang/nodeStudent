/**
 * Created by Administrator on 2017/6/23.
 */
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
var router = require('./router.js');

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/favicon.ico') {
        return;
    }

    if (pathname == '/') {
        //主页
        router.showIndex(req, res);
    }else if(req.url == '/upload' && req.method.toLowerCase() == 'post'){
        //获取上传的图片
        router.upload(req,res);
    } else if (pathname == '/upload') {
        //上传页
        router.showUpload(req, res);
    } else if (/detail/.test(pathname)) {
        //详情页
        router.showDetail(req, res);

    } else {
        //加载资源
        fs.readFile(__dirname + pathname, function (err, data) {
            if (err) {
                router.show404(req, res);
                return;
            }
            var extname = path.extname(pathname);
            getMime(extname, function (mime) {
                res.writeHead(200, {'Content-type': mime});
            });

            res.end(data);
        });
    }

});

server.listen(80);

function getMime(extname, callback) {
    fs.readFile(__dirname + '/mime.json', function (err, data) {
        if (err) {
            console.log('没有mime.json文件！');
            return;
        }
        var mimeObj = JSON.parse(data);
        var mime = mimeObj[extname];
        callback(mime);
    });
}