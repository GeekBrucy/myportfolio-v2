var throttle = function (fn, delay, atleast) {
  var timer = null;
  var previous = null;

  return function () {
    var now = +new Date();

    if (!previous) previous = now;
    if (atleast && now - previous > atleast) {
      if (fn.length > 1) {
        for (var i = 0; i < fn.length; i++) {
          fn[i]()
        }
      } else {
        fn();
      }
      // 重置上一次开始时间为本次结束时间
      previous = now;
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (fn.length > 1) {
          for (var i = 0; i < fn.length; i++) {
            fn[i]()
          }
        } else {
          fn();
        }
        previous = null;
      }, delay);
    }
  }
}