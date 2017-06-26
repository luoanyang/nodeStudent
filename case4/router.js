/**
 * Created by Administrator on 2017/6/23.
 */
exports.showIndex = showIndex;
exports.showDetail = showDetail;
exports.showUpload = showUpload;
exports.show404 = show404;

const ejs = require('ejs');
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

}

function show404(req, res) {
    fs.readFile(__dirname + "/views/404.ejs", function (err, data) {
        res.writeHead(404, {'Content-type': 'text/html;charset=utf8'});
        res.end(data);
    })
}

