/**
 * Created by Administrator on 2017/6/23.
 */
exports.showIndex = showIndex;
exports.showDetail = showDetail;
exports.showUpload = showUpload;
exports.show404 = show404;

const fs = require('fs');

function showIndex(req, res) {
    fs.stat(__dirname+'/uploads',function(err,stats){
        console.log(stats);
    });
}

function showDetail(req, res) {

}

function showUpload(req, res) {

}

function show404(req, res) {
    fs.readFile(__dirname + "/views/404.html", function (err, data) {
        res.writeHead(404, {'Content-type': 'text/html;charset=utf8'});
        res.end(data);
    })
}

