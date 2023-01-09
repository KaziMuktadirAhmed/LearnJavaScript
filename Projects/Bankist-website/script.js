'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (event) {
  section1.scrollIntoView({ behavior: 'smooth' });
  return true;
});

// Page Navigation using event deligation
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      if (id !== '#')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

// Tabbed component (operations part)
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

const changeFocusOnEvent = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(elem => {
      if (elem !== link) elem.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', changeFocusOnEvent.bind(0.5));
nav.addEventListener('mouseout', changeFocusOnEvent.bind(1));

// Sticku navigation: Intersection observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNavCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Section fade in animation
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (event) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => imageObserver.observe(img));

// Slider
const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnSlideLeft = document.querySelector('.slider__btn--left');
  const btnSlideRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlides = slides.length;

  const goToSlide = function (current) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - current)}%)`)
    );
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlides - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  btnSlideRight.addEventListener('click', nextSlide);
  btnSlideLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') prevSlide();
    if (event.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('dots__dot')) {
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
