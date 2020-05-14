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
    if (user) {
      // 如果用户存在，登录失败
      socket.emit("loginError", {
        msg: "登录失败",
      });
    } else {
      users.push(data);

      socket.username = data.username;
      socket.avatar = data.avatar;

      // 表示用户不存在
      socket.emit("loginSuccess", data);

      // 广播消息  socket.emit() 告诉当前用户 io.emit() 广播事件
      io.emit("addUser", data);

      io.emit("userList", users);
    }
  });

  // 断开连接
  socket.on("disconnect", () => {
    // 删除当前用户
    const idx = users.findIndex((item) => item.username === socket.username);
    users.splice(idx, 1);

    // 广播提示
    io.emit("delUser", {
      username: socket.username,
      avatar: socket.avatar,
    });

    // 变更用户列表
    io.emit("userList", users);
  });

  // 接收消息
  socket.on("sendMessage", (data) => {
    io.emit("receiveMsg", data);
  });

  //接受图片信息
  socket.on("sendImage", (data) => {
    io.emit("receiveImage", data);
  });
});

http.listen(8080, () => {
  console.log("服务器启动成功");
});
