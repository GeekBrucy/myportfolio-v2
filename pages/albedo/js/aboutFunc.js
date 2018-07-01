var aboutFunc = (function () {
  var showDetail = function () {
    var showMore = document.querySelectorAll('.show-more')
    for (var i = 0; i < showMore.length; i++) {
      showMore[i].onclick = function () {
        var icon = this.querySelector('i')
        if(window.getComputedStyle(icon, null).display === 'none') {
          return
        }
        icon.classList.toggle('fa-chevron-down')
        icon.classList.toggle('fa-chevron-up')
        this.nextElementSibling.classList.toggle('open')
      }
    }
  }
  var init = throttle(showDetail, 200, 1000)
  return init
}())