var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(require("express").static("public"));

app.get("/", (req, res) => {
  res.redirect("index.html");
});

const users = [];

io.on("connection", (socket) => {
  socket.on("login", (data) => {
    const user = users.find((item) => item.username === data.username);
    console.info("data", data);
    if (user) {
      // 如果用户存在，登录失败
      socket.emit("loginError", { msg: "登录失败" });
    } else {
      users.push(data);

      // 表示用户不存在
      socket.emit("loginSuccess", data);

      // 广播消息  socket.emit() 告诉当前用户 io.emit() 广播事件
      io.emit("addUser", data);

      io.emit("userList", users);
    }
  });
});

http.listen(8080, () => {
  console.log("服务器启动成功");
});
