var later = require('later');
var https = require('https');

var appid = "wx88f3e6f3f3425db2";
var appsecret = "ae09a01a9e54d31dfb0b214b8b7e41d8";
var access_token;

later.date.localTime();
console.log("Now:" + new Date());

var sched = later.parse.recur().every(1).hour();
next = later.schedule(sched).next(10);
console.log(next);

var timer = later.setInterval(test, sched);
setTimeout(test, 2000);

function test(){
	console.log(new Date());
	var options = {
		hostname: 'api.weixin.qq.com',
		path:'/cgi-bin/token?grant_type=client_credential&appid=' + appid +'&secret=' + appsecret

	};
	var req = https.get(options, function(res){
		var bodyChunks = '';
		res.on('data', function(chunk){
			bodyChunks += chunk;
		});
		res.on('end',function(){
			var body = JSON.parse(bodyChunks);
			if (body.access_token){
				access_token = body.access_token;
				console.log(access_token);
			}else{
				console.dir(body);
			}
		});
	});
	req.on('error',function(e){
		console.log('ERROR:' + e.message);
	});
}
