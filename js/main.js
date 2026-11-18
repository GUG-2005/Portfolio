document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scroll for CTA
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#journey');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
  document.querySelectorAll('.show-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const desc = btn.previousElementSibling;
      if (desc && desc.classList.contains('timeline-desc')) {
        desc.classList.toggle('expanded');
        btn.textContent = desc.classList.contains('expanded') ? 'Show less' : 'Show more';
      }
    });
  });

  // ===== Intersection Observer for Scroll Animations =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item, .card, .gallery-item').forEach(el => {
    observer.observe(el);
  });
  
   // ===== Lightbox for Hobbies =====
  const lightbox = document.getElementById('lightbox');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxDesc = document.querySelector('.lightbox-desc');
  const lightboxIcon = document.querySelector('.lightbox-icon');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.dataset.title || 'Hobby';
      const desc = item.dataset.desc || '';
      const icon = item.dataset.icon || '🎨';

      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxIcon) lightboxIcon.textContent = icon;
      if (lightbox) lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});