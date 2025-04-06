const POSTS_URL = 'https://raw.githubusercontent.com/championrat/dad-blog/master/posts/posts.txt';

fetch(POSTS_URL)
  .then(res => res.text())  
  .then(parsePosts)
  .catch(err => {
    document.getElementById('blog-container').innerText = 'Failed to load posts.';
    console.error(err);
});

function parsePosts(text) {
  const container = document.getElementById('blog-container');
  container.innerHTML = '';

  const rawPosts = text.split('---');
  
  rawPosts.forEach(postText => {
    const lines = postText.trim().split('\n');
    if (lines.length < 5) return;

    const [time, id, author, title, ...bodyLines] = lines;
    const bodyMarkdown = bodyLines.join('\n');
    const bodyHTML = marked.parse(bodyMarkdown);

    const postHTML = `
      <div class="post" id="${id}">
        <h2>${title}</h2>
        <div class="meta">By <strong>${author}</strong> on ${time}</div>
        <div class="content">${bodyHTML}</div>
      </div>
    `;
    container.innerHTML += postHTML;
  });
}
