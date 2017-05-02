var express = require('express');//引用express模块
var wechat = require('wechat');//使用wechat模块实现微信测试好回复功能，
var http=require('http');
app = express();
var config = {
	token: 'yinping',
	appid: 'wx88f3e6f3f3425db2',
	 //encodingAESKey: 'encodinAESKey',
	};
				
app.use(express.query());
app.use('/', wechat(config, function (req, res, next) {
	var message = req.weixin; //message是用户发送的数据内容
	if (message.Content === 'hi' || message.Content === 'hello') {//根据发送的内容
		res.reply('hello');//回复
	} else if (message.Content === '你好') {
		res.reply({
			content: '你好，我是小微！',
			type: 'text'
		});
	} else if (message.Content === 'music') {
		res.reply({
			type: "music",//调用音乐接口，，必须备注type
			content: {
				title: "试听",
				description: "曾经的你",
				musicUrl: "http://music.163.com/#/song?id=167975",
				hqMusicUrl: "http://music.163.com/#/song?id=167975",
				thumbMediaId: "thisThumbMediaId"
			}
		});
	} else if(message.MsgType==='image'){//如果内容是图片
	    res.reply({
	       	type:"text",
			content:"this is a beautiful picture!"
	      });
	} else {
		res.reply('休息一会儿~');
	}
}));
