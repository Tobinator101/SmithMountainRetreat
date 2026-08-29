(function() {
  "use strict";


  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  // ===========================
  // DYNAMIC GALLERY LOADER
  // ===========================
  // Instead of hardcoding a <div> per photo, this probes
  // images/galleryPhotos/image-01.webp, image-02.webp, ... in order.
  // Any number that 404s (a deleted photo) is just skipped - no gap
  // is left, and everything else shifts up to fill the space.
  //
  // To add more photos: drop them in as image-42.webp, image-43.webp,
  // etc. (next sequential numbers). If you ever go past MAX_INDEX,
  // just raise the number below.
  const GALLERY_FOLDER = 'images/galleryPhotos/';
  const GALLERY_PREFIX = 'image-';
  const GALLERY_EXT = '.webp';
  const MAX_INDEX = 60;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function imageExists(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function buildGalleryItem(src) {
    const item = document.createElement('div');
    item.className = 'col-12 col-sm-6 col-md-4 col-lg-3 portfolio-item filter-app';

    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('data-gallery', 'portfolioGallery');
    link.className = 'portfolio-lightbox preview-link';

    const img = document.createElement('img');
    img.src = src;
    img.className = 'img-fluid';
    img.alt = '';

    link.appendChild(img);
    item.appendChild(link);
    return item;
  }

  async function loadGallery() {
    const container = select('.gallery-container');
    if (!container) {
      initLightboxes();
      return;
    }

    const indices = Array.from({ length: MAX_INDEX }, (_, i) => i + 1);

    // Check every index in parallel for speed, but keep results in
    // their original numeric order when building the gallery.
    const sources = await Promise.all(indices.map(async (i) => {
      const src = GALLERY_FOLDER + GALLERY_PREFIX + pad(i) + GALLERY_EXT;
      const exists = await imageExists(src);
      return exists ? src : null;
    }));

    container.innerHTML = '';
    sources.filter(Boolean).forEach((src) => {
      container.appendChild(buildGalleryItem(src));
    });

    initLightboxes();
  }

  function initLightboxes() {
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });

    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }

  if (select('.gallery-container')) {
    loadGallery();
  } else {
    initLightboxes();
  }

})()
