const Koa = require("koa");
const fs = require("fs"); //读取模板
const route = require("koa-route"); //koa路由
const path = require("path"); //路径管理
const serve = require("koa-static"); //koa 封装静态资源
const promise = require("fs.promised");
const compose = require("koa-compose"); //合并中间件
const koaBody = require("koa-body"); //表单提交
const mongoose = require("mongoose");

const app = new Koa();

//连接数据库。
const mongodb = mongoose.connect(
  "mongodb://chenlin:19970520@www.chenyibai.cn:27017/my",
  {
    useNewUrlParser: true
  }
);

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});
var user = mongoose.model("ts", userSchema);

var u = {
  username: "chenaln",
  password: "12a3",
  email: ""
};
var newUser = new user(u);
// newUser.save();

//读取test库中的show集合
// const user = mongodb.get("tt");
const main = async ctx => {
  // 配置静态资源
  const data = await user.find({}, { _id: 0 });
  ctx.response.body = data;
};
const index = async ctx => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream("complate/index.html");
};
console.log(__dirname)
app.use(route.get("/", index));
app.use(serve(path.join(__dirname + "/static")));

var server = app.listen(3333, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`${host},${port}`);
});
