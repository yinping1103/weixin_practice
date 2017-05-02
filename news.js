var http = require('http');
var parseUrl = require('url').parse;

var NEWS = {
	1:'这里是第一篇新闻',
	2:'这里是第二篇新闻',
	3:'这里是第三篇新闻'
};

function getNews(id){
	return NEWS[id]  || '文章不存在';
}
var server = http.createServer(function(req,res){
	function send(html){
		res.writeHead(200,{
			'content-type':'text/html;charset=utf-8'
		});
		res.end(html);
	}
	var info = parseUrl(req.url, true);
	req.pathname = info.pathname;
	req.query = info.query;


	if(req.url ==='/'){
		send('<ul>'+ 
				'<li><a href= "/news?type=1&id=1">新闻1</a></li>'+
				'<li><a href= "/news?type=1&id=2">新闻2</a></li>'+
				'<li><a href= "/news?type=1&id=3">新闻3</a></li>'+
		'</ul>');
	} else if(req.pathname === '/news' && req.query.type === '1'){
		send(getNews(req.query.id));
	} else {
		send('<h1>文章不存在！</h1>');
	}
});

server.listen(2231);
