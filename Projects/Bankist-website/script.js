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

const observer = new IntersectionObserver(stickyNavCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observer.observe(header);
