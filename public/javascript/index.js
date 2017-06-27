(function(window, document, undefined) {
  var sigin = document.querySelector('#sigin')
  var username = document.querySelector('input[name=username]')
  var password = document.querySelector('input[name=password]')

  sigin.onclick = function(e) {
    if (!username.value || !password.value) {
      return alert('请填写用户名或密码')
    }
    var xhr = new XMLHttpRequest()
    xhr.open('post', `${config.serverURL}api/sigin`)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(`username=${username.value}&password=${password.value}`)
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText)
        if (result.message == '成功') {
          location.href = config.serverURL
        }else {
          alert(result.message)
        }
      }
    }
  }

}(window, document))
