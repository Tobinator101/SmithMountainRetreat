const slides = document.querySelectorAll('.slide');
const indicators = document.getElementById('indicators');
const navbar = document.querySelector('.navbar');
const sideBrand = document.querySelector('.side-brand');
const scrollThreshold = 10;
let lastScroll = 0;


slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    const slideElement = slides[index];
    slideElement.scrollIntoView({
      behavior: 'smooth'
    });
  });

  indicators.appendChild(dot);
});


window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const currentScroll = window.pageYOffset;

  if (currentScroll === 0) {
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
    sideBrand.classList.remove('visible');
  } else if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
    sideBrand.classList.add('visible');
  }

  const activeIndex = Math.round(currentScroll / windowHeight);
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });

  lastScroll = currentScroll;
});
