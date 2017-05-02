var PORT = 2231;
var http = require('http');
var qs = require('qs');
var parseStr=require('xml2js').parseString;
var TOKEN = 'yinping';

function checkSignature(params,token){
  var key = [token,params.timestamp,params.nonce].sort().join('');
  var sha1 = require('crypto').createHash('sha1');
  sha1.update(key);
  return sha1.digest('hex') == params.signature;
}

var server = http.createServer(function (request, response) {//用http模块创建服务器
  var query = require('url').parse(request.url).query;
  var params = qs.parse(query);

  if(!checkSignature(params,TOKEN)){
  response.end('signature fail');
  return;}

//以上内容与verify.js微信TOKEN验证内容一致，不再进行注释


  if(request.method == "GET"){//如果请求是get
    response.end(params.echostr);//服务器返回echostr，服务器通过有效校验
  }else{
  	var postdata = "";
  
    request.addListener("data",function(postchunk){//监听request，发生data事件时，将返回的值记录到postdata中
      postdata += postchunk;
    });

    request.addListener("end",function(){
    	console.log("this is postdata: " + postdata);//发生end事件时，以xml格式返回用户发送的数据
      	//var jsonpostdata=JSON.parse(postdata);
      	
      	parseString(postdata, function(err, result){//使用xml2js模块的parseStr，将xml格式的postdata转换为json格式
        	if(err){
			  	console.log(err);
			  	return;
			}
			console.log("this is result: " + JSON.stringify(result));//JSON.stringify函数将result转换为json字符串
			  	response.end('success');
		    
      	});
    });
    
   }
});

server.listen(PORT);
console.log("Server running at port:" + PORT +".");

