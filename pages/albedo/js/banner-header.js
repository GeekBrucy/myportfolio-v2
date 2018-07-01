var bannerHeader = (function () {
  // small screen the navbar in pg-header will become sidebar
  // and shopping cart list will become sidebar as well
  // but these two should not open together
  var navContainer = document.querySelector('.nav-container')
  var cartSidebar = document.querySelector('.cart-sidebar')
  var userIconContainer = document.querySelector('.user-icon')
  var userIcon = userIconContainer.querySelector('i')
  var cartIconContainer = document.querySelector('.cart')
  var cartIcon = cartIconContainer.querySelector('i')


  // category pannel function
  // mouseIn: boolean type
  function categoryHover(cate, mouseIn) {
    if (mouseIn) {
      cate.classList.add('active')
      cate.style.visibility = 'visible'
    } else {
      cate.classList.remove('active')
      cate.style.visibility = 'hidden'
    }
  }

  // click burger icon, show sidebar
  var burgerIconClick = function () {
    var burgerContainer = document.querySelector('.burger-icon')
    var sideBar = document.querySelector('.sidebar .sidebar-menu')
    var burgerIcon = burgerContainer.querySelector('i')
    burgerContainer.onclick = function () {
      if (burgerIcon.classList.contains('fa-bars')) {
        burgerIcon.style.transform = 'rotate(-180deg)'
        burgerIcon.classList.remove('fa-bars')
        burgerIcon.classList.add('fa-times')
        burgerIcon.style.transform = 'rotate(180deg)'
        sideBar.parentElement.style.width = '4.5rem'
        sideBar.style.transform = 'translateX(100%)'
        sideBar.style.visibility = 'visible'
        sideBar.style.opacity = 1
      } else {
        burgerIcon.style.transform = 'rotate(180deg)'
        burgerIcon.classList.remove('fa-times')
        burgerIcon.classList.add('fa-bars')
        burgerIcon.style.transform = 'rotate(-180deg)'
        sideBar.parentElement.style.width = 0
        sideBar.style.transform = 'translateX(-100%)'
        sideBar.style.visibility = 'hidden'
        sideBar.style.opacity = 0
      }
    }
  }

  // click search button, show input
  var searchIconClick = function () {
    var searchContainer = document.querySelector('.search-icon')
    var searchBar = document.querySelector('.searchbar')
    var cartIcon = document.querySelector('.cart')
    var timer = null
    searchContainer.onclick = function () {
      var searchIcon = searchContainer.querySelector('i')
      if (searchIcon.classList.contains('fa-search')) {
        searchBar.style.visibility = 'visible'
        searchBar.style.opacity = 1
        searchIcon.classList.remove('fa-search')
        searchIcon.classList.add('fa-times')
        searchContainer.classList.add('searching')
        cartIcon.classList.add('searching')
        searchBar.classList.add('searching')
      } else {
        searchBar.style.visibility = 'hidden'
        searchBar.style.opacity = 0
        searchIcon.classList.remove('fa-times')
        searchIcon.classList.add('fa-search')
        searchContainer.classList.remove('searching')
        cartIcon.classList.remove('searching')
        searchBar.classList.remove('searching')
      }
    }
  }

  // page scroll down, the banner header stick at top
  var scrollHeader = function () {
    var bannerHeader = document.querySelector('.banner-header')
    var sideBar = document.querySelector('.sidebar')
    var category = document.querySelector('.category')
    window.onscroll = function () {
      if (window.pageYOffset > 70) {
        if (!bannerHeader.classList.contains('scroll')) {
          bannerHeader.classList.add('scroll')
          sideBar.classList.add('scroll')
          category.classList.add('scroll')
        }
      } else {
        if (bannerHeader.classList.contains('scroll')) {
          bannerHeader.classList.remove('scroll')
          sideBar.classList.remove('scroll')
          category.classList.remove('scroll')
        }
      }
    }
  }

  // hover on first item and last item in sidebar, show category and other info
  var hoverSidebarItem = function () {
    var sidebarChildren = document.querySelector('.sidebar .sidebar-menu').children
    var firstItem_Sidebar = sidebarChildren[0]
    var lastItem_Sidebar = sidebarChildren[sidebarChildren.length - 1]
    var category = document.querySelector('.category')
    firstItem_Sidebar.onmouseover = function () {
      categoryHover(category, true)
      category.onmouseover()
    }
    category.onmouseover = function () {
      categoryHover(this, true)
      firstItem_Sidebar.classList.add('onhover')
    }
    firstItem_Sidebar.onmouseleave = function () {
      categoryHover(category, false)
      if (category.style.visibility === 'hidden') {
        category.onmouseleave()
      } else {
        category.onmouseover()
      }
    }
    category.onmouseleave = function () {
      categoryHover(this, false)
      firstItem_Sidebar.classList.remove('onhover')
    }
  }

  // small screen will show user icon, click this activate right sidebar
  var userIconClick = function () {
    var userIconContainer = document.querySelector('.user-icon')
    var userIcon = userIconContainer.querySelector('i')
    userIconContainer.onclick = function () {
      if (cartSidebar.classList.contains('active')) {
        cartSidebar.classList.remove('active')
        cartIcon.classList.toggle('fa-shopping-basket')
        cartIcon.classList.toggle('fa-times')
      }
      userIcon.classList.toggle('fa-user')
      userIcon.classList.toggle('fa-times')
      navContainer.classList.toggle('active')
    }
  }
  // small screen click cart icon, activate cartsidebar
  var cartIconClick = function () {
    var cartIconContainer = document.querySelector('.cart')
    var cartIcon = cartIconContainer.querySelector('i')
    cartIconContainer.onclick = function () {
      if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active')
        userIcon.classList.toggle('fa-user')
        userIcon.classList.toggle('fa-times')
      }
      cartIcon.classList.toggle('fa-shopping-basket')
      cartIcon.classList.toggle('fa-times')
      cartSidebar.classList.toggle('active')
    }
  }
  var init = throttle([burgerIconClick, searchIconClick, scrollHeader, hoverSidebarItem, userIconClick, cartIconClick], 200, 800)

  return init
}())