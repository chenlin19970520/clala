const Koa = require("koa");
const fs = require("fs"); //读取模板
const route = require("koa-route"); //koa路由
const path = require("path"); //路径管理
const serve = require("koa-static"); //koa 封装静态资源
const promise = require("fs.promised");
const compose = require("koa-compose"); //合并中间件
const koaBody = require("koa-body"); //表单提交
const monk = require("monk");

const app = new Koa();

//使用monk--中间层，用来连接数据库。
const mongodb = monk("www.chenyibai.cn/test");
//读取test库中的show集合
const user = mongodb.get("show");

const main = async ctx => {
  console.log("a");
  const data = await user.find();
  ctx.response.body = data;
};
app.use(route.get("/", main));

// 配置静态资源
app.use(serve(path.join(__dirname)));
var server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`${host},${port}`);
});
