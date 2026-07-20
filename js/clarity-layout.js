document.addEventListener('DOMContentLoaded', () => {
  const menus = document.getElementById('menus')
  const blogInfo = document.getElementById('blog-info')
  const article = document.querySelector('article.post-content')

  if (menus && !menus.querySelector('.clarity-nav')) {
    const currentPath = window.location.pathname
    menus.innerHTML = [
      '<nav class="clarity-nav" aria-label="网站导航">',
      `<a href="/" class="${currentPath === '/' || currentPath === '/index.html' ? 'is-current' : ''}"><i class="fa-regular fa-file-lines"></i><span>文章</span></a>`,
      `<a href="/archives/" class="${currentPath.startsWith('/archives') ? 'is-current' : ''}"><i class="fa-solid fa-box-archive"></i><span>归档</span></a>`,
      `<a href="/categories/" class="${currentPath.startsWith('/categories') ? 'is-current' : ''}"><i class="fa-regular fa-folder-open"></i><span>分类</span></a>`,
      '<a href="/about/"><i class="fa-regular fa-user"></i><span>关于</span></a>',
      '</nav>'
    ].join('')
  }

  if (blogInfo && !document.querySelector('.clarity-sidebar-profile')) {
    const profile = document.createElement('div')
    profile.className = 'clarity-sidebar-profile'
    profile.innerHTML = '<img src="/img/avatar.jpg" alt="goudan 的头像"><strong>goudan</strong><span>记录思考与日常</span>'
    document.querySelector('#page-header')?.appendChild(profile)
  }

  if (article) article.setAttribute('data-title', document.title.split('|')[0].trim())
})
