// 连接socket服务
var socket = io("http://localhost:8080");

$('#login_avatar li').on('click', function () {
  $(this).addClass('now').siblings().removeClass('now')
})

// 登录
$('#loginBtn').on('click', function () {
  var username = $('#username').val().trim()
  if (!username) {
    alert('请输入用户名')
    return
  }

  // 获取选择的头像
})
