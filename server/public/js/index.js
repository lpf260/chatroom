// 连接socket服务
var socket = io("http://localhost:8080");
var usernameLogin, avatarLogin;

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
  $("#myAvatar").attr("src", avatar);
  $("#myUsername").text(username);
  usernameLogin = username;
  avatarLogin = avatar;
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

  scrollIntoView();
});

// 监听当前所有登录用户
socket.on("userList", (data) => {
  $("#userList").html("");
  $("#count").text(data.length);
  data.map((item) => {
    $("#userList").append(`<li class="user">
    <div class="avatar"><img src="${item.avatar}" alt="" /></div>
    <div class="name">${item.username}</div>
  </li>`);
  });

  scrollIntoView();
});

// 用户退出
socket.on("delUser", (data) => {
  const { username } = data;
  $(".box-bd").append(`
  <div class="system">
          <p class="message_system">
            <span class="content">${username}退出了群聊</span>
          </p>
        </div>`);

  scrollIntoView();
});

// 聊天功能
$(".btn-send").on("click", () => {
  // 获取聊天内容
  const content = $("#content").val().trim();
  $("#content").val("");
  if (!content) {
    return alert("请输入内容");
  }

  socket.emit("sendMessage", {
    msg: content,
    username: usernameLogin,
    avatar: avatarLogin,
  });
});

socket.on("receiveMsg", (data) => {
  if (data.username === usernameLogin) {
    $(".box-bd").append(`<div class="message-box">
          <div class="my message">
            <img class="avatar" src="${data.avatar}" alt="" />
            <div class="content">
              <div class="bubble">

                <div class="bubble_cont">${data.msg}</div>
              </div>
            </div>
          </div>
        </div>`);
  } else {
    $(".box-bd").append(`
     <div class="message-box">
          <div class="other message">
            <img class="avatar" src="${data.avatar}" alt="" />
            <div class="content">
              <div class="nickname">${data.username}</div>
              <div class="bubble">
                <div class="bubble_cont">${data.msg}</div>
              </div>
            </div>
          </div>
        </div>`);
  }
  scrollIntoView();
});

function scrollIntoView() {
  $(".box-bd").children(":last").get(0).scrollIntoView(false);
}

// 发送图片功能
$("#file").on("change", function () {
  var file = this.files[0];

  var fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = function () {
    socket.emit("sendImage", {
      username: usernameLogin,
      avatar: avatarLogin,
      img: fr.result,
    });
  };
});

socket.on("receiveImage", (data) => {
  if (data.username === usernameLogin) {
    $(".box-bd").append(`<div class="message-box">
          <div class="my message">
            <img class="avatar" src="${data.avatar}" alt="" />
            <div class="content">
              <div class="bubble">

                <div class="bubble_cont"><img src="${data.img}"/></div>
              </div>
            </div>
          </div>
        </div>`);
  } else {
    $(".box-bd").append(`
     <div class="message-box">
          <div class="other message">
            <img class="avatar" src="${data.avatar}" alt="" />
            <div class="content">
              <div class="nickname">${data.username}</div>
              <div class="bubble">
                <div class="bubble_cont"><img src="${data.img}"/></div>
              </div>
            </div>
          </div>
        </div>`);
  }

  // 等待图片加载完成
  $(".box-bd img:last").on("load", function () {
    scrollIntoView();
  });
});
