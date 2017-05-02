var later = require('later');//引用later模块
later.date.localTime();//设置使用本地时区
console.log("Now:"+new Date());//打印当前时间
var sched = later.parse.recur().every(1).hour();//later.parse.recur()可以为创建时间表提供简单的可连接的api
//每隔一小时启动
next = later.schedule(sched).next(10);//later.schedule(schedule).next(count, start, end)
console.log(next);//输出next()设置的这10个时间

//setInterval函数，按照sched的时间表间隔调用test函数
var timer = later.setInterval(test,sched);

setTimeout(test,2000);//程序运行2s后将自动调用test函数一次

function test(){
  console.log(new Date());
} 
