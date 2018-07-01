function loadData (param, url, type='streams/') {
  let online_html = ''
  let offline_html = ''
  $.getJSON(url + type + param + '?callback=?', function (stream_data) {
    if (stream_data.stream) {
      online_html = `
      <a href="${stream_data.stream.channel.url}" target="blank" class="result-item" title="${stream_data.stream.channel.display_name}">
        <div class="item-title">
          <img class="item-logo" src="${stream_data.stream.channel.logo}">
          <div class="item-name">${stream_data.stream.channel.display_name}</div>
        </div>
        <div class="item-info">
          <div class="item-status online">
            <span>online</span>
          </div>
          <div class="item-desc">${stream_data.stream.channel.status}</div>
          <div class="item-views">${stream_data.stream.viewers} Viewing</div>
        </div>
      </a>
      `
      $('.result-all-detail').append(online_html)
      $('.result-online-detail').append(online_html)
    } else {
      type = 'channels/'
      $.getJSON(url + type + param + '?callback=?', function (channels_data) {
        offline_html = `
        <a href="${channels_data.url}" title="${channels_data.display_name}" target="blank" class="result-item">
          <div class="item-title">
            <img class="item-logo" src="${channels_data.logo}">
            <div class="item-name">${channels_data.display_name}</div>
          </div>
          <div class="item-info">
            <div class="item-status offline">
              <span>offline</span>
            </div>
            <div class="item-views">${channels_data.views} Views</div>
          </div>
        </a>
        `
        $('.result-all-detail').append(offline_html)
        $('.result-offline-detail').append(offline_html)
      })
    }

  })
}

function handleTabClick () {
  $('.tab-label').on('click', function () {
    $('.tab-label').removeClass('active')
    $(this).addClass('active')
  })
}

$(document).ready(function () {
  let baseUrl_stream = 'https://wind-bow.gomix.me/twitch-api/'
  let saved = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  saved.forEach(function (el) {
    loadData(el, baseUrl_stream)
  })
  handleTabClick()
})
