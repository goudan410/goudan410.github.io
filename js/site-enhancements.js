document.addEventListener('DOMContentLoaded', () => {
  // Only article pages receive a discussion thread.
  const article = document.querySelector('article.post-content')
  if (!article || document.querySelector('.comments-panel')) return

  const panel = document.createElement('section')
  panel.className = 'comments-panel'
  panel.setAttribute('aria-label', 'Comments')
  panel.innerHTML = [
    '<h2 class="comments-panel__heading"><i class="fa-regular fa-comments"></i> 评论</h2>',
    '<p class="comments-panel__hint">使用 GitHub 登录后即可参与讨论。</p>'
  ].join('')

  const thread = document.createElement('script')
  thread.src = 'https://utteranc.es/client.js'
  thread.async = true
  thread.crossOrigin = 'anonymous'
  thread.setAttribute('repo', 'goudan410/goudan410.github.io')
  thread.setAttribute('issue-term', 'pathname')
  thread.setAttribute('label', 'comment')
  thread.setAttribute('theme', document.documentElement.dataset.theme === 'dark' ? 'github-dark' : 'github-light')
  panel.appendChild(thread)

  const target = document.querySelector('#post .post-copyright') || article
  target.insertAdjacentElement('afterend', panel)
})
