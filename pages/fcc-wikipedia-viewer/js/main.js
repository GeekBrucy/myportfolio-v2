(function () {
  let btnSubmit = $('.search-submit')
  let userInput = document.querySelector('.search-input')
  let timer = null
  btnSubmit.on('click', function () {
    let result = document.querySelector('.result')
    result.innerHTML = ''
    let userInputValue = userInput.value
    if (!userInputValue) {
      alert('Please Enter Keywords!')
      userInput.focus()
      return
    }
    const queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userInputValue + "&format=json&limit=10"
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      let html = ''
      $.ajax({
        url: queryURL,
        dataType: 'jsonp',
        success: function (data) {
          response = data
          console.log(response)
        }
      }).done(function (response) {
        let len = response[1].length
        if (!len) {
          result.innerHTML = `
          <div class="result-container">
            <div class="result-title">No Result</div>
            <div class="result-body">
              Please Change Another Keyword...
            </div>
          </div>
          `
          return
        }
        for (let i = 0; i < len; i++) {
          html += `
          <div class="result-container">
            <a href="${response[3][i]}" target="blank">
              <div class="result-title">${response[1][i]}</div>
              <div class="result-body">
                ${response[2][i]}
              </div>
            </a>
          </div>
          `
        }
        result.innerHTML += html
      }, 1000)
    })
  })
  userInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      btnSubmit.click()
    }
  })
})()