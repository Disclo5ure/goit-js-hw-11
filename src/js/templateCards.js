export const templateCards = (items, gallery) => {
  items.forEach(item => {
    gallery.innerHTML += `<div class="photo-card">
    <img src="${item.largeImageURL}" alt="${item.tags}" loading="lazy" class="card-img"/>
    <div class="info">
      <p class="info-item">
        <b class="info-header">Likes</b>
        <span class="info-text">${item.likes}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Views</b>
        <span class="info-text">${item.views}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Comments</b>
        <span class="info-text">${item.comments}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Downloads</b>
        <span class="info-text">${item.downloads}</span>
      </p>
    </div>
  </div>`;
  });
};
