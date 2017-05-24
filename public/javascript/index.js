(function(window, document, undefined) {
  var sigin = document.querySelector('#sigin')
  var username = document.querySelector('input[name=username]')
  var password = document.querySelector('input[name=password]')

  sigin.onclick = function(e) {
    if (!username.value || !password.value) {
      return alert('请填写用户名或密码')
    }
    var xhr = new XMLHttpRequest()
    xhr.open('post', 'http://192.168.2.179:2080/api/sigin')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(`username=${username.value}&password=${password.value}`)
    xhr.readystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(1111)
      }
    }
  }

}(window, document))
