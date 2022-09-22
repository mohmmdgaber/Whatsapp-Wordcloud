function genphoto() {
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new XMLHttpRequest()
    request.open('POST',window.location.href, true)
    request.setRequestHeader('X-CSRFToken', csrf)
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Random-token', 'application/json');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  
    request.send(JSON.stringify({
      "request_name": "change-extra-fields",
      "type": "increase",
  
    }))
    var urll='/wordcloud/'
    str=urll+window.location.href.toString().split('redirect-success/',2)[1]
    console.log(str)
    window.location.href =str; 
   

  }

  function removedata() {
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new XMLHttpRequest()
    request.open('POST',window.location.href, true)
    request.setRequestHeader('X-CSRFToken', csrf)
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Random-token', 'application/json');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.send(JSON.stringify({
      "request_name": "change-extra-fields",
      "type": "increase",
  
    }))
  }