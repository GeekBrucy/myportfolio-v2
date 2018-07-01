var projModule = (function () {
  var proj = {
    getData: async function () {
      const res = await fetch('./data/proj.json')
      const data = await res.json()
      const len = data.length
      this.attachToDomStr(data, len)
    },

    getDataCategory: function (data, len) {
      var arr = []
      for (var i = 0; i < len; i++) {
        if (arr.indexOf(data[i].category) === -1) {
          arr.push(data[i].category)
        }
      }
      return arr
    },

    attachToDomStr: function (data, len) {
      var contentContainer = document.querySelector('.content-container')
      var cate = this.getDataCategory(data, len)
      contentContainer.innerHTML = ''
      for (var i = 0; i < cate.length; i++) {
        var temp = data.filter(function (val) {
          if (val.category === cate[i]) {
            return val
          }
        })
        tempStr = `
            <div class="cate-title">
              <h4>${cate[i]}</h4>
              <i class="fas fa-sort-down"></i>
            </div>
            <div class="items-container">
        `
        for (var j = 0; j < temp.length; j++) {
          tempStr += `
          <div class="collapse-item" style="background-image:url(${temp[j].snapshot})">
            <h1>${temp[j].name}</h1>
            <a href=${temp[j].link} target="blank">link</a>
            <p class="item-desc">${temp[j].desc}</p>
          </div>
          `
        }
        tempStr += `</div>`
        contentContainer.innerHTML += tempStr
      }
    },
  }
  return proj
}())