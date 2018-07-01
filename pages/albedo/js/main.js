window.onload = function () {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
  imgResponsive()
  bannerHeader()
  aboutFunc()
}