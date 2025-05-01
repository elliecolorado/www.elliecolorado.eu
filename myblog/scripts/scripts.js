document.addEventListener('DOMContentLoaded', () => {
  const blogPostsContainer = document.getElementById('blog-posts');
  const sortSelect = document.getElementById('sort');

  const fetchPosts = async () => {
    const postFiles = [
      'posts/ZipCracker/ZipCracker.html',
      // Añade más rutas de archivos de posts aquí
    ];
  
    const blogPosts = [];
  
    for (const file of postFiles) {
      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Error al cargar ${file}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
  
        const title = doc.querySelector('title').textContent;
        const description = doc.querySelector('meta[name="description"]').getAttribute('content');
        const tags = doc.querySelector('meta[name="tags"]').getAttribute('content').split(',').map(tag => tag.trim());
        const date = doc.querySelector('meta[name="date"]').getAttribute('content');
        const url = file;
  
        blogPosts.push({ title, description, tags, date, url });
      } catch (error) {
        console.error(error);
      }
    }
  
    return blogPosts;
  };
  
  const renderPosts = (posts) => {
    blogPostsContainer.innerHTML = '';
    posts.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-tags', post.tags.join(' '));
      card.setAttribute('data-date', post.date);
      card.innerHTML = `
        <div class="card-content">
          <h2>${post.title}</h2>
          <p>${post.description}</p>
          <p><small>${post.date}</small></p>
        </div>
      `;
      card.addEventListener('click', () => {
        window.location.href = post.url;
      });
      blogPostsContainer.appendChild(card);
    });
  };

  const sortPosts = (posts, order) => {
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  sortSelect.addEventListener('change', applyFilters);

  // Render initial posts
  fetchPosts().then(posts => renderPosts(sortPosts(posts, 'newest')));
});
