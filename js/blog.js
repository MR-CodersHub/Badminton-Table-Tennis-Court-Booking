/**
 * COURTLY - BLOG LISTING PAGE SCRIPT
 * Dynamically renders Featured Article, Category Filters, Search,
 * Blog Cards Grid, Empty State, and Demo Newsletter Validation.
 */

(function () {
  'use strict';

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderFeaturedArticle(article) {
    const container = document.getElementById('featuredArticleContainer');
    if (!container || !article) return;

    const detailUrl = `blog-details.html?slug=${encodeURIComponent(article.slug)}`;
    container.innerHTML = '';

    const card = createEl('div', 'blg-featured-card');
    const row = createEl('div', 'row g-0 align-items-stretch');

    // Image Col
    const imgCol = createEl('div', 'col-lg-6');
    const imgWrap = createEl('div', 'blg-featured-img-wrap');
    const img = createEl('img');
    img.src = article.featuredImage;
    img.alt = article.imageAlt;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    imgCol.appendChild(imgWrap);

    // Content Col
    const bodyCol = createEl('div', 'col-lg-6');
    const body = createEl('div', 'blg-featured-body');

    const topMeta = createEl('div', 'd-flex align-items-center flex-wrap gap-2 mb-3');
    topMeta.appendChild(createEl('span', 'badge-lime-pill', article.category));
    topMeta.appendChild(createEl('span', 'small text-teal fw-bold', `${article.date} • ${article.readingTime}`));

    const title = createEl('h3', 'fs-2 fw-bold mb-3', article.title);
    const excerpt = createEl('p', 'text-muted mb-4', article.excerpt);

    const footerRow = createEl('div', 'd-flex align-items-center justify-content-between flex-wrap gap-3 pt-3 border-top border-secondary border-opacity-25');

    const authorWrap = createEl('div', 'd-flex align-items-center gap-2');
    const avatar = createEl('img', 'blg-author-avatar-sm');
    avatar.src = article.author.photo;
    avatar.alt = article.author.name;
    avatar.loading = 'lazy';
    const authorText = createEl('div');
    authorText.appendChild(createEl('strong', 'd-block small', article.author.name));
    authorText.appendChild(createEl('span', 'text-dimmed', article.author.role));
    authorText.lastChild.style.fontSize = '0.75rem';
    authorWrap.appendChild(avatar);
    authorWrap.appendChild(authorText);

    const cta = createEl('a', 'btn-courtly-lime');
    cta.href = detailUrl;
    cta.innerHTML = '<span>Read Full Article</span> <i class="fa-solid fa-arrow-right ms-2"></i>';

    footerRow.appendChild(authorWrap);
    footerRow.appendChild(cta);

    body.appendChild(topMeta);
    body.appendChild(title);
    body.appendChild(excerpt);
    body.appendChild(footerRow);
    bodyCol.appendChild(body);

    row.appendChild(imgCol);
    row.appendChild(bodyCol);
    card.appendChild(row);
    container.appendChild(card);
  }

  function buildBlogCard(article) {
    const detailUrl = `blog-details.html?slug=${encodeURIComponent(article.slug)}`;
    const col = createEl('div', 'col-12 col-md-6 col-lg-4');
    const card = createEl('article', 'blg-card');
    card.tabIndex = 0;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        window.location.href = detailUrl;
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.location.href = detailUrl;
      }
    });

    const imgWrap = createEl('div', 'blg-card-img-wrap');
    const img = createEl('img');
    img.src = article.featuredImage;
    img.alt = article.imageAlt;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    imgWrap.appendChild(createEl('div', 'blg-card-overlay'));
    imgWrap.appendChild(createEl('span', 'badge-lime-pill blg-card-cat-badge', article.category));

    const body = createEl('div', 'blg-card-body');
    const metaTop = createEl('div', 'd-flex align-items-center justify-content-between small text-dimmed mb-2');
    metaTop.appendChild(createEl('span', '', article.date));
    metaTop.appendChild(createEl('span', 'text-teal fw-bold', article.readingTime));

    const title = createEl('h4', 'blg-card-title', article.title);
    const excerpt = createEl('p', 'blg-card-excerpt', article.excerpt);

    const cardFooter = createEl('div', 'd-flex align-items-center justify-content-between mt-auto pt-3 border-top border-secondary border-opacity-25');
    const authorWrap = createEl('div', 'd-flex align-items-center gap-2');
    const avatar = createEl('img', 'blg-author-avatar-sm');
    avatar.src = article.author.photo;
    avatar.alt = article.author.name;
    avatar.loading = 'lazy';
    authorWrap.appendChild(avatar);
    authorWrap.appendChild(createEl('span', 'small fw-bold', article.author.name));

    const readLink = createEl('a', 'small fw-bold text-lime text-decoration-none');
    readLink.href = detailUrl;
    readLink.innerHTML = 'Read Article <i class="fa-solid fa-arrow-right ms-1"></i>';

    cardFooter.appendChild(authorWrap);
    cardFooter.appendChild(readLink);

    body.appendChild(metaTop);
    body.appendChild(title);
    body.appendChild(excerpt);
    body.appendChild(cardFooter);

    card.appendChild(imgWrap);
    card.appendChild(body);
    col.appendChild(card);
    return col;
  }

  function initBlogListing() {
    const blogData = window.COURTLY_BLOG_DATA;
    if (!blogData) return;

    const { articles, categories } = blogData;
    const catContainer = document.getElementById('blogCategoryPills');
    const grid = document.getElementById('blogArticlesGrid');
    const searchInput = document.getElementById('blogSearchInput');
    const countEl = document.getElementById('blogResultsCount');
    const emptyState = document.getElementById('blogEmptyState');
    const resetBtn = document.getElementById('resetBlogFiltersBtn');

    // Read optional ?category=... query param (from Blog Details sidebar)
    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get('category');
    let activeCategory = categories.includes(initialCat) ? initialCat : 'All Articles';
    let searchTerm = '';

    renderFeaturedArticle(articles[0]);

    function renderCategories() {
      if (!catContainer) return;
      catContainer.innerHTML = '';
      categories.forEach(cat => {
        const btn = createEl('button', `blg-cat-btn ${cat === activeCategory ? 'active' : ''}`, cat);
        btn.type = 'button';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', cat === activeCategory ? 'true' : 'false');
        btn.addEventListener('click', () => {
          activeCategory = cat;
          renderCategories();
          renderGrid();
        });
        catContainer.appendChild(btn);
      });
    }

    function renderGrid() {
      if (!grid) return;
      const q = searchTerm.trim().toLowerCase();

      const filtered = articles.filter(article => {
        const matchesCat = activeCategory === 'All Articles' || article.category === activeCategory;
        if (!matchesCat) return false;
        if (!q) return true;

        const haystack = [
          article.title,
          article.excerpt,
          article.category,
          article.author.name,
          ...(article.keywords || [])
        ].join(' ').toLowerCase();

        return haystack.includes(q);
      });

      grid.innerHTML = '';
      filtered.forEach(article => {
        grid.appendChild(buildBlogCard(article));
      });

      if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${articles.length} articles`;
      }

      if (emptyState) {
        emptyState.classList.toggle('d-none', filtered.length > 0);
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderGrid();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'All Articles';
        searchTerm = '';
        if (searchInput) searchInput.value = '';
        renderCategories();
        renderGrid();
      });
    }

    renderCategories();
    renderGrid();

    if (initialCat && document.getElementById('blog-listing')) {
      document.getElementById('blog-listing').scrollIntoView({ behavior: 'smooth' });
    }
  }

  function initNewsletterDemo() {
    const form = document.getElementById('blogNewsletterForm');
    const emailInput = document.getElementById('blogNewsletterEmail');
    const feedback = document.getElementById('blogNewsletterFeedback');

    if (!form || !emailInput || !feedback) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

      feedback.classList.remove('d-none', 'text-danger', 'text-teal');
      if (!valid) {
        feedback.classList.add('text-danger');
        feedback.textContent = 'Please enter a valid email address (e.g. player@example.com).';
        return;
      }

      feedback.classList.add('text-teal');
      feedback.textContent = `Demo confirmation: "${val}" validated locally. No external email server is connected on this static preview.`;
      emailInput.value = '';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBlogListing();
    initNewsletterDemo();
  });
})();
