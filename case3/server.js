/**
 * Created by Administrator on 2017/6/23.
 */
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile(__dirname + "/views/index.ejs", function (err, data) {
            var template = data.toString();
            var dictionary = {
                a: 6,
                news: [{"title":"nodejs"}, {"title":"ejs"},{"title":"express"}]
            };
            var html = ejs.render(template, dictionary);
            res.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
            res.end(html);
        });
    }
}).listen(80);
