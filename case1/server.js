var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    var fileUrl = "./"+path.normalize("static/" + pathname);
    //判断用户输入的是文件夹还是文件，如果是文件夹就转到文件夹下的index.html
    if(pathname.indexOf(".") == -1){
        fileUrl += "/index.ejs";
    }

    //得到拓展名
    var extname = path.extname(pathname);

    fs.readFile(fileUrl,function(err,data){
        //文件不存在
        if(err){
            console.log(1)
            fs.readFile('./static/404.ejs',function(err,data){
                res.writeHead(404,{'Content-type':'text/html;charest=utf8'});
                res.end(data);
            });
            return;
        }
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-type":mime});
        });
        
        res.end(data);
    });
});

server.listen(80,"127.0.0.1");

function getMime(extname,callback){
    fs.readFile('./mime.json',function(err,data){
        if(err){
            throw Error("找不到mime.json文件！");
        }
        //转成json
        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname] || "text/plain";
        //执行回调函数
        callback(mime);
    });
}