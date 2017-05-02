var PORT = 2231; //设置端口号
var http = require('http');
var qs = require('qs');

var TOKEN = 'yinping';
function checkSignature(params, token){
 //params是可变参数数组
 var key = [token,params.timestamp,params.nonce].sort().join('');//sort()排序，无参数代表按字母顺序排序。
 //join()是通过参数将元素连接起来。
 var sha1 = require('crypto').createHash('sha1');//crypto模块，创建并返回一个hash对象，
 //这里使用sha1算法加密

//crypto模块里hash.update()方法将字符串相加形成密钥
 sha1.update(key); 
//crypto模块的hash.digest()方法得到计算过后的hash值
 return sha1.digest('hex') == params.signature;
}

//使用http模块createServer()创建服务器
var server = http.createServer(function (request, response) {
  var query = require('url').parse(request.url).query;//url模块将请求的url字符串转换为url对象
  var params= qs.parse(query);//qs模块将query请求字符串解析为一组关键值和值对
 
  console.log(params);
  console.log("token-->",TOKEN);
 
  if(checkSignature(params,TOKEN)) {//调用checkSignature()函数判断查询字符串中的值是否与TOKEN一致
    response.end(params.echostr);//返回echostr值,接入成功。
 }else{
   response.end('signature fail');
 }
});
server.listen(PORT);//监听端口
console.log("Server running at port: "+ PORT +".");






