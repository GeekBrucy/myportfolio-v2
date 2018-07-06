var projModule = (function () {
  var colors = {
    html5: '#E54D26',
    css3: '#006BB4',
    javascript: '#F7DF1E',
    bootstrap: '#563D7C',
    vuejs: '#41B883',
    flexbox: '#FFA645',
    sass: '#D06A9C',
    ajax: '#1F82C5',
    fetch: '#1FA59C',
    grid: '#E84E34'
  }
  var contentContainer = document.getElementsByClassName('content-container')[0]
  // Read local json data
  var getData = async function () {
    var res = await fetch('./data/proj.json')
    var data = await res.json()
    var len = data.length
    attachToDomStr(data, len)
  }

  // Remove repetitive category for collapse list
  var getDataCategory = function (data, len) {
    var arr = []
    for (var i = 0; i < len; i++) {
      if (arr.indexOf(data[i].category) === -1) {
        arr.push(data[i].category)
      }
    }
    return arr
  }

  // handle tech field in data, and bind to element
  var getDataTech = function (data, parentNode) {
    if (data.tech) {
      var techContainer = document.createElement('div')
      techContainer.classList.add('item-tech')
      var techArr = data.tech
      var len = techArr.length
      var elemArr = []
      for (var i = 0; i < len; i++) {
        var span = document.createElement('span')
        var techClass = 'tech-' + techArr[i]
        span.className = 'tech ' + techClass
        span.style.backgroundColor = colors[techArr[i]]
        span.innerText = techArr[i]
        elemArr.push(span)
      }
     elemArr.map(function(el) {
      techContainer.appendChild(el)
     })
     parentNode.appendChild(techContainer)
    }
  }
  function clickToExpand () {
    this.nextElementSibling.classList.toggle('open')
  }
  // Attach Data to DOM
  var attachToDomStr = function (data, len) {

    var cate = getDataCategory(data, len)
    contentContainer.innerHTML = ''
    for (var i = 0; i < cate.length; i++) {
      // Get a list of data under specific category
      var temp = data.filter(function (val) {
        if (val.category === cate[i]) {
          return val
        }
      })
      // Generate category DOM
      // Category Container
      var cateDiv = document.createElement('div')
      // Category Icon
      var iTag = document.createElement('i')
      // Category Text
      var spanTag = document.createElement('span')
      cateDiv.classList.add('cate-title')
      spanTag.innerText = cate[i]
      iTag.classList.add('fas', 'fa-sort-down')
      cateDiv.appendChild(spanTag)
      cateDiv.appendChild(iTag)
      cateDiv.addEventListener('click', clickToExpand, false)
      contentContainer.appendChild(cateDiv)
      // the container to hold collapse items
      var itemContainer = document.createElement('div')
      itemContainer.classList.add('items-container')
      for (var j = 0; j < temp.length; j++) {
        // collapse item holder
        var itemDiv = document.createElement('div')
        // item overlay
        var itemOverlay = document.createElement('div')
        // item link
        var itemLink = document.createElement('a')
        // item desc
        var itemDesc = document.createElement('p')
        // item technology
        var itemTech = document.createElement('ul')


        itemDiv.classList.add('collapse-item')
        itemDiv.style.backgroundImage = 'url(' + temp[j].snapshot + ')'

        itemOverlay.classList.add('item-overlay')
        itemOverlay.appendChild(itemLink)
        itemOverlay.appendChild(itemDesc)
        // handle tech array
        getDataTech(temp[j], itemOverlay)

        itemDiv.appendChild(itemOverlay)

        // itemLink settings
        itemLink.href = temp[j].link
        itemLink.target = 'blank'
        itemLink.classList.add('item-link')
        itemLink.innerHTML = temp[j].name + '<i class="fas fa-link"></i>'

        // itemDesc settings
        itemDesc.classList.add('item-desc')
        itemDesc.innerText = temp[j].desc

        itemContainer.appendChild(itemDiv)
        contentContainer.appendChild(itemContainer)
      }
    }
  }


  var init = function () {
    getData()
  }
  return init
}())