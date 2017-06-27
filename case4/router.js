/**
 * Created by Administrator on 2017/6/23.
 */
exports.showIndex = showIndex;
exports.showDetail = showDetail;
exports.showUpload = showUpload;
exports.show404 = show404;
exports.upload = upload;

const formidable = require('formidable');
const sd = require('silly-datetime');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

function showIndex(req, res) {
    var ablumFolder = [];
    //获取相册文件夹
    fs.readdir(__dirname + '/uploads/', function (err, files) {
        files.forEach(function (el, ind) {
            fs.stat(__dirname + '/uploads/' + el, function (err, stats) {
                if (stats.isDirectory()) {
                    ablumFolder.push(el);
                }
            });
            if (files.length == ind + 1) {
                fs.readFile(__dirname + '/views/index.ejs', function (err, data) {
                    var template = data.toString();
                    ablumFolder = ablumFolder.sort(function (x, y) {
                        return x - y
                    });
                    var data = {
                        'ablumFolder': ablumFolder
                    }
                    var html = ejs.render(template, data);
                    res.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
                    res.end(html)
                });
            }
        });
    });
}

function showDetail(req, res) {
    var folder = req.url.substr(8);
    var imgs = [];
    fs.readdir(__dirname + '/uploads/' + folder, function (err, files) {
        if (err) {
            fs.readFile(__dirname + '/views/404.ejs', function (err, data) {
                res.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
                res.end(data);
            });
            return;
        }
        files.forEach(function (el, ind) {
            if (/[.img]|[.jpg]|[.jpeg|[.gif]/.test(el)) {
                imgs.push('../uploads/' + folder + '/' + el);
            }
        });
        fs.readFile(__dirname + '/views/detail.ejs', function (err, data) {
            var template = data.toString();
            var data = {
                'title': folder,
                'imgs': imgs
            }
            var html = ejs.render(template, data);
            res.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
            res.end(html);
        });
    });
}

function showUpload(req, res) {
    var ablumFolder = [];

    fs.readdir(__dirname + '/uploads/', function (err, files) {
        files.forEach(function (el, ind) {
            if (!/\./.test(el)) {
                ablumFolder.push(el);
            }
        });

        fs.readFile(__dirname + '/views/upload.ejs', function (err, data) {
            if (err) {
                fs.readFile(__dirname + "/views/404.ejs", function (err, data) {
                    res.writeHead(404, {'Content-type': 'text/html;charset=utf8'});
                    res.end(data);
                })
                return;
            }
            var template = data.toString();
            var html = ejs.render(template, {'ablumFolder': ablumFolder});
            res.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
            res.end(html);
        });


    });
}

function show404(req, res) {
    fs.readFile(__dirname + "/views/404.ejs", function (err, data) {
        res.writeHead(404, {'Content-type': 'text/html;charset=utf8'});
        res.end(data);
    })
}

function upload(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir ='./uploads/';

    form.parse(req, function(err, fields, files) {
        var time = sd.format(new Date(),'YYYYMMDDHHmm')
        var random = Math.random()*8999+10000;
        var olddir ='./'+files.imgs.path;
        var nowdir = './uploads/'+fields.folder+'/'+time+random+path.extname(files.imgs.name);
        fs.rename(olddir,nowdir,function(){
            var html = "<script>alert('上传成功!');location.href='/'</script>"
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(html);
        })

    });
}