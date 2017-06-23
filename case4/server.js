/**
 * Created by Administrator on 2017/6/23.
 */
const formidable = require('formidable');
const http = require('http');
const path = require('path');
const ejs = require('ejs');
const url = require('url');
const fs = require('fs');
var router = require('./router.js');

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/'){
        pathname ='/views/index.html';
    }
    fs.readFile(__dirname + pathname, function (err, data) {
        if (err) {
            router.show404(req, res);
            return;
        }
        fs.stat(__dirname+'/uploads',function(err,stats){
            console.log(stats);
        });
        var extname = path.extname(pathname);
        getMime(extname,function(mime){
            res.writeHead(200, {'Content-type': mime});
        });
        res.end(data);
    });
});

server.listen(80);

function getMime(extname,callback) {
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