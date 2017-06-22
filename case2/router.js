/**
 * Created by Administrator on 2017/6/22.
 */
exports.showIndex = showIndex;
exports.showStudent = showStudent;
exports.show404 = show404;

function showIndex(req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=utf8"});
    res.end("i am home page");
}

function showStudent(req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=utf8"});
    res.end("i is student page");
}

function show404(req, res) {
    res.writeHead(404, {"Content-type": "text/html;charset=utf8"});
    res.end("404")
}
