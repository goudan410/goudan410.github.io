// Keep this list in sync when publishing a new static article.
const BLOG_LIBRARY = [
  {
    title: '我的第一篇博客',
    path: '/2026/07/14/%E6%88%91%E7%9A%84%E7%AC%AC%E4%B8%80%E7%AF%87%E5%8D%9A%E5%AE%A2/',
    date: '2026-07-14',
    summary: '狗蛋第一次用博客，有点意思。',
    category: ['随笔', '博客起步']
  }
]

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.replace(/index\.html$/, '')
  const currentPost = BLOG_LIBRARY.find(post => post.path === currentPath)
  const card = document.querySelector('.recent-post-item')

  if (card && BLOG_LIBRARY[0]) addCategoryBadge(card, BLOG_LIBRARY[0])
  if (currentPost) {
    document.querySelector('#article-container')?.insertAdjacentHTML(
      'beforebegin',
      `<div class="post-category-path">${currentPost.category.map(item => `<span>${item}</span>`).join('<i class="fa-solid fa-chevron-right"></i>')}</div>`
    )
  }

  const explorer = document.getElementById('category-explorer')
  if (explorer) mountCategoryExplorer(explorer)
})

function addCategoryBadge(card, post) {
  if (card.querySelector('.post-category-badge')) return
  const meta = card.querySelector('.article-meta-wrap')
  if (!meta) return
  meta.insertAdjacentHTML('beforeend', `<a class="post-category-badge" href="/categories/">${post.category[0]}</a>`)
}

function mountCategoryExplorer(root) {
  const tree = makeTree(BLOG_LIBRARY)
  root.innerHTML = `
    <aside class="folder-pane">
      <div class="folder-pane__title"><i class="fa-regular fa-folder-tree"></i> 文章文件夹</div>
      <div class="folder-tree">${tree.html}</div>
    </aside>
    <section class="folder-content">
      <div class="folder-content__heading">
        <p>分类目录</p><h1>全部文章</h1><span>${BLOG_LIBRARY.length} 篇文章</span>
      </div>
      <div class="folder-content__list"></div>
    </section>`

  const list = root.querySelector('.folder-content__list')
  const heading = root.querySelector('.folder-content__heading')
  const render = (path = '') => {
    const posts = path ? BLOG_LIBRARY.filter(post => post.category.join('/') === path) : BLOG_LIBRARY
    heading.querySelector('h1').textContent = path ? path.split('/').at(-1) : '全部文章'
    heading.querySelector('span').textContent = `${posts.length} 篇文章`
    list.innerHTML = posts.length ? posts.map(post => `
      <a class="folder-post" href="${post.path}">
        <div><h2>${post.title}</h2><p>${post.summary}</p></div>
        <time>${post.date}</time>
      </a>`).join('') : '<p class="folder-empty">这个文件夹暂时还没有文章。</p>'
  }

  root.querySelectorAll('[data-folder]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-folder]').forEach(item => item.classList.remove('is-active'))
      button.classList.add('is-active')
      render(button.dataset.folder)
    })
  })
  render()
}

function makeTree(posts) {
  const categories = new Map()
  posts.forEach(post => {
    const [parent, child] = post.category
    if (!categories.has(parent)) categories.set(parent, new Map())
    categories.get(parent).set(child, (categories.get(parent).get(child) || 0) + 1)
  })
  const groups = [...categories].map(([parent, children]) => `
    <details open>
      <summary><i class="fa-regular fa-folder-open"></i>${parent}<b>${[...children.values()].reduce((a, b) => a + b, 0)}</b></summary>
      ${[...children].map(([child, count]) => `<button data-folder="${parent}/${child}"><i class="fa-regular fa-file-lines"></i>${child}<b>${count}</b></button>`).join('')}
    </details>`).join('')
  return { html: `<button class="is-active" data-folder=""><i class="fa-solid fa-layer-group"></i>全部文章<b>${posts.length}</b></button>${groups}` }
}
