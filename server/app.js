var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(require("express").static("public"));

app.get("/", (req, res) => {
  res.redirect("index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(8080, () => {
  console.log("服务器启动成功");
});
