// 连接socket服务
var socket = io("http://localhost:8080");

$("#login_avatar li").on("click", function () {
  $(this).addClass("now").siblings().removeClass("now");
});

// 登录
$("#loginBtn").on("click", function () {
  var username = $("#username").val().trim();
  if (!username) {
    alert("请输入用户名");
    return;
  }

  // 获取选择的头像
  var avatar = $("#login_avatar li.now img").attr("src");

  // 需要告诉socket.io服务 登录
  socket.emit("login", {
    username: username,
    avatar: avatar,
  });
});

socket.on("loginError", (data) => {
  alert("用户名已经存在");
});

socket.on("loginSuccess", (data) => {
  // 需要显示聊天窗口 隐藏登录窗口
  $(".login_box").fadeOut();
  $(".container").fadeIn();
  // 设置个人信息
  const { avatar, username } = data;
  console.info(data);
  $("#myAvatar").attr("src", avatar);
  $("#myUsername").text(username);
});

// 监听进入聊天室
socket.on("addUser", (data) => {
  const { username } = data;
  $(".box-bd").append(`
  <div class="system">
          <p class="message_system">
            <span class="content">${username}加入了群聊</span>
          </p>
        </div>`);
});

// 监听当前所有登录用户
socket.on("userList", (data) => {
  data.map((item) => {
    $("#userList").append(`<li class="user">
    <div class="avatar"><img src="${item.avatar}" alt="" /></div>
    <div class="name">${item.username}</div>
  </li>`);
  });
});
