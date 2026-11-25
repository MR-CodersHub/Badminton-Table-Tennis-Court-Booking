/**
 * COURTLY - DYNAMIC BLOG DETAILS PAGE SCRIPT
 * Reads ?slug= from URL, populates article hero, cover, structured body,
 * author info, categories, recent posts, related articles, and prev/next links.
 */

(function () {
  'use strict';

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderArticleBody(sections, container) {
    if (!container || !Array.isArray(sections)) return;
    container.innerHTML = '';

    sections.forEach(block => {
      if (block.type === 'paragraph') {
        container.appendChild(createEl('p', '', block.text));
      } else if (block.type === 'heading') {
        container.appendChild(createEl('h2', '', block.text));
      } else if (block.type === 'list' && Array.isArray(block.items)) {
        const list = createEl(block.ordered ? 'ol' : 'ul');
        block.items.forEach(item => {
          list.appendChild(createEl('li', '', item));
        });
        container.appendChild(list);
      } else if (block.type === 'tip') {
        const box = createEl('div', 'bld-tip-box');
        box.appendChild(createEl('strong', '', block.title || 'Pro Tip'));
        box.appendChild(createEl('p', 'mb-0', block.text));
        container.appendChild(box);
      }
    });
  }

  function renderSidebar(articles, categories, currentArticle) {
    const catWrap = document.getElementById('sidebarCategories');
    if (catWrap) {
      catWrap.innerHTML = '';
      categories
        .filter(c => c !== 'All Articles')
        .forEach(cat => {
          const link = createEl('a', `bld-cat-link ${cat === currentArticle.category ? 'active' : ''}`, cat);
          link.href = `blog.html?category=${encodeURIComponent(cat)}`;
          catWrap.appendChild(link);
        });
    }

    const recentWrap = document.getElementById('sidebarRecentPosts');
    if (recentWrap) {
      recentWrap.innerHTML = '';
      articles
        .filter(a => a.id !== currentArticle.id)
        .slice(0, 4)
        .forEach(post => {
          const item = createEl('a', 'bld-recent-item');
          item.href = `blog-details.html?slug=${encodeURIComponent(post.slug)}`;

          const img = createEl('img', 'bld-recent-thumb');
          img.src = post.featuredImage;
          img.alt = post.imageAlt;
          img.loading = 'lazy';

          const textWrap = createEl('div');
          textWrap.appendChild(createEl('span', 'bld-recent-title', post.title));
          textWrap.appendChild(createEl('span', 'small text-dimmed', post.date));

          item.appendChild(img);
          item.appendChild(textWrap);
          recentWrap.appendChild(item);
        });
    }
  }

  function renderRelatedArticles(articles, currentArticle) {
    const grid = document.getElementById('relatedArticlesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const related = (currentArticle.relatedIds || [])
      .map(id => articles.find(a => a.id === id))
      .filter(a => a && a.id !== currentArticle.id);

    related.forEach(rel => {
      const col = createEl('div', 'col-12 col-md-4');
      const card = createEl('article', 'bld-related-card');

      const img = createEl('img', 'bld-related-img');
      img.src = rel.featuredImage;
      img.alt = rel.imageAlt;
      img.loading = 'lazy';

      const body = createEl('div', 'p-4 d-flex flex-column flex-grow-1');
      const cat = createEl('span', 'badge-sports-sub align-self-start mb-2', rel.category);
      const title = createEl('h4', 'fs-5 fw-bold mb-2', rel.title);
      const excerpt = createEl('p', 'small text-muted mb-3', rel.excerpt);

      const link = createEl('a', 'small fw-bold text-lime text-decoration-none mt-auto');
      link.href = `blog-details.html?slug=${encodeURIComponent(rel.slug)}`;
      link.innerHTML = 'Read Article <i class="fa-solid fa-arrow-right ms-1"></i>';

      body.appendChild(cat);
      body.appendChild(title);
      body.appendChild(excerpt);
      body.appendChild(link);

      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  function renderPrevNext(articles, currentIndex) {
    const prevLink = document.getElementById('prevArticleLink');
    const prevTitle = document.getElementById('prevArticleTitle');
    const nextLink = document.getElementById('nextArticleLink');
    const nextTitle = document.getElementById('nextArticleTitle');

    const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

    if (prevLink && prevTitle) {
      if (prevArticle) {
        prevLink.href = `blog-details.html?slug=${encodeURIComponent(prevArticle.slug)}`;
        prevLink.classList.remove('disabled');
        prevTitle.textContent = prevArticle.title;
      } else {
        prevLink.href = '#';
        prevLink.classList.add('disabled');
        prevTitle.textContent = 'First Article';
      }
    }

    if (nextLink && nextTitle) {
      if (nextArticle) {
        nextLink.href = `blog-details.html?slug=${encodeURIComponent(nextArticle.slug)}`;
        nextLink.classList.remove('disabled');
        nextTitle.textContent = nextArticle.title;
      } else {
        nextLink.href = '#';
        nextLink.classList.add('disabled');
        nextTitle.textContent = 'Latest Article';
      }
    }
  }

  function initBlogDetails() {
    const blogData = window.COURTLY_BLOG_DATA;
    if (!blogData) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const article = slug ? blogData.getBySlug(slug) : null;

    const notFoundEl = document.getElementById('articleNotFoundState');
    const wrapperEl = document.getElementById('articleContentWrapper');

    if (!article) {
      if (wrapperEl) wrapperEl.classList.add('d-none');
      if (notFoundEl) notFoundEl.classList.remove('d-none');
      document.title = 'COURTLY - Article Not Found';
      return;
    }

    document.title = `${article.title} | COURTLY Journal`;

    // Section 1: Hero
    document.getElementById('detailCategory').textContent = article.category;
    document.getElementById('detailTitle').textContent = article.title;
    document.getElementById('detailExcerpt').textContent = article.excerpt;
    document.getElementById('detailAuthorPhoto').src = article.author.photo;
    document.getElementById('detailAuthorPhoto').alt = article.author.name;
    document.getElementById('detailAuthorName').textContent = article.author.name;
    document.getElementById('detailAuthorRole').textContent = article.author.role;
    document.getElementById('detailDate').textContent = article.date;
    document.getElementById('detailReadingTime').textContent = article.readingTime;

    // Section 2: Cover Image
    const coverImg = document.getElementById('detailCoverImg');
    coverImg.src = article.coverImage;
    coverImg.alt = article.imageAlt;

    // Section 3: Full Article Body
    renderArticleBody(article.sections, document.getElementById('detailArticleBody'));

    // Section 4: Author Card
    document.getElementById('authorCardImg').src = article.author.photo;
    document.getElementById('authorCardImg').alt = article.author.name;
    document.getElementById('authorCardName').textContent = article.author.name;
    document.getElementById('authorCardRole').textContent = article.author.role;
    document.getElementById('authorCardBio').textContent = article.author.bio;

    // Section 5: Sidebar
    renderSidebar(blogData.articles, blogData.categories, article);

    // Section 6: Related Articles
    renderRelatedArticles(blogData.articles, article);

    // Section 7: Prev / Next
    const currentIndex = blogData.articles.findIndex(a => a.id === article.id);
    renderPrevNext(blogData.articles, currentIndex);
  }

  document.addEventListener('DOMContentLoaded', initBlogDetails);
})();
