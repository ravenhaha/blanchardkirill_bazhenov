// set root for nav--active and hero
document.addEventListener("DOMContentLoaded", ResizeHeight);
window.addEventListener('resize', ResizeHeight);

function ResizeHeight() {
  let headerTop = document.querySelector('.header-top');
  let headerTopHeight = headerTop.offsetHeight;
  document.querySelector(':root').style.setProperty('--header-top-height', `${headerTopHeight}px`);

  let headerBottom = document.querySelector('.header-bottom');
  let headerBottomHeight = headerBottom.offsetHeight;
  document.querySelector(':root').style.setProperty('--header-bottom-height', `${headerBottomHeight}px`);
}

// burger events
let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav');
let menuLinks = document.querySelectorAll('.close-link');
let topHeader = document.querySelector('.header-top');

burger.addEventListener('click', function (){
  document.body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger--active');
  burger.setAttribute("aria-expanded", "true");
  menu.classList.toggle('nav--active');
  topHeader.classList.toggle('header-top--active');
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    document.body.classList.remove('stop-scroll');
    burger.classList.remove('burger--active');
    burger.setAttribute("aria-expanded", "false");
    menu.classList.remove('nav--active');
    topHeader.classList.remove('header-top--active');
  })
})

// header-top search
let openBtn = document.querySelector('.loupe');
let closeBtn = document.querySelector('.search__close');
let inputSearch = document.querySelector('.search');

openBtn.addEventListener('click', function () {
  inputSearch.classList.add('search--active');
});

closeBtn.addEventListener('click', function () {
  inputSearch.classList.remove('search--active');
})

// dropdown scroll
const bars = document.querySelectorAll('[data-simplebar]')

bars.forEach(el => {
  new SimpleBar(el, {
    ariaLabel: 'Прокручиваемая область',
  });
  el.querySelector('.simplebar-content-wrapper').setAttribute('tabindex', '-1');
});

// header-bottom dropdown
const menuBtn = document.querySelectorAll('.tab');
const drops = document.querySelectorAll('.dropdown');

menuBtn.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    let currentBtn = e.currentTarget;
    let currentDrop = currentBtn.closest('.menu__item').querySelector('.dropdown');

    menuBtn.forEach(function (el) {
      if (el !== currentBtn) {
        el.classList.remove('tab--active');
        el.setAttribute("aria-expanded", "false");
      }
    });

    drops.forEach(function (el) {
      if (el !== currentDrop) {
        el.classList.remove('dropdown--active');
        el.setAttribute("aria-hidden", "true");
      }
    });

    currentDrop.classList.toggle('dropdown--active');
    currentDrop.setAttribute("aria-hidden", "false");
    currentBtn.classList.toggle('tab--active');
    currentBtn.setAttribute("aria-expanded", "true");
  });
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.menu__list')) {

    menuBtn.forEach(function (el) {
      el.classList.remove('tab--active');
      el.setAttribute("aria-expanded", "false");
    });

    drops.forEach(function (el) {
      el.classList.remove('dropdown--active');
      el.setAttribute("aria-hidden", "true");
    });
  }
});

// hero swiper
let mainSwiper = new Swiper('.main-slider', {
  wrapperClass: 'main-slider__wrapper',
  slideClass: 'main-slider__slide',
  loop: true,
  autoplay: {
    delay: 4000,
  },
})

// gallery select
const element = document.querySelector('.filter__select');
const choices = new Choices(element,{
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: "",
});

// gallery swiper
let gallerySwiper = new Swiper('.gallery-slider', {
  wrapperClass: 'gallery-slider__wrapper',
  slideClass: 'gallery-slider__slide',

  pagination: {
    el: '.gallery-nav__pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.gallery-nav__bnt-next',
    prevEl: '.gallery-nav__bnt-prev',
  },

  slidesPerView: 1,
  spaceBetween: 20,
  slidesPerGroup: 1,

  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 40,
      slidesPerGroup: 2,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 35,
      slidesPerGroup: 2,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  },

  a11y: {
    prevSlideMessage: 'Предыдущие картины',
    nextSlideMessage: 'Следующие картины',
    slideLabelMessage: '{{index}} из {{slidesLength}}',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  watchSlidesProgress:true,
  slideVisibleClass: 'swiper-slide-visible',
  on: {
    init: function () {
      this.slides.forEach(function (slide) {
        if (!slide.classList.contains("swiper-slide-visible")) {
          slide.tabIndex = "-1";
        }
        else {
          slide.tabIndex = "";
        }
      })
    },
    slideChange: function () {
      this.slides.forEach(function (slide) {
        if (!slide.classList.contains("swiper-slide-visible")) {
          slide.tabIndex = "-1";
        }
        else {
          slide.tabIndex = "";
        }
      })
    },
  },
})

// gallery modal
const btn = document.querySelectorAll('.gallery-slider__slide');
const modal = document.querySelector('.modal__list');
const notes = document.querySelectorAll('.modal__item');
const exitBtn = document.querySelectorAll('.note__btn');

btn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    document.body.classList.toggle('stop-scroll');

    let path = e.currentTarget.getAttribute('data-path');

    notes.forEach(function (el) {
     el.classList.remove('modal__item--active');
    })

    document.querySelector(`[data-gallery="${path}"]`).classList.add('modal__item--active');
    modal.classList.add('modal__list--active');

    setTimeout(function() {
      let activeModal = document.querySelector('.modal__item--active');
      activeModal.querySelector('.note__btn').focus();
    }, 100);
  });
});

exitBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.body.classList.remove('stop-scroll');
    modal.classList.remove('modal__list--active');
    notes.classList.remove('modal__item--active');
  })
})

modal.addEventListener('click', function (el){
  if (el.target === modal) {
    notes.forEach(function (el) {
      el.classList.remove('modal__item--active');
    })
    document.body.classList.remove('stop-scroll');
    modal.classList.remove('modal__list--active');
  }
})

document.addEventListener('keydown', function (e){
  if (e.key === 'Escape') {
    notes.forEach(function (el) {
      el.classList.remove('modal__item--active');
    })
    document.body.classList.remove('stop-scroll');
    modal.classList.remove('modal__list--active');
  }
})

// catalog accordion
new Accordion('.accordion', {
  elementClass: 'accordion__item',
  triggerClass: 'accordion__control',
  panelClass: 'accordion__content',
  activeClass: 'accordion--active',

  duration: 700,
  openOnInit: [0],
});

// catalog tabs
let tabsBtn = document.querySelectorAll('.artist__btn');
let tabsItem = document.querySelectorAll('.bookmark');

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const way = e.currentTarget.dataset.way;

    tabsBtn.forEach(function (btn) {
      btn.classList.remove('artist__btn--active');
      btn.setAttribute("aria-expanded", "false");
    });
    e.currentTarget.classList.add('artist__btn--active');
    e.currentTarget.setAttribute("aria-expanded", "true");

    tabsItem.forEach(function (el) {
      el.classList.remove('bookmark--active')
    });
    document.querySelector(`[data-mark="${way}"]`).classList.add('bookmark--active');
  });
});

// set href for artist on screen <= 992px
window.onload = function () {
  tabsBtn.forEach(function (btn){
    Way(btn)
  })
};

window.addEventListener('resize',function (){
  tabsBtn.forEach(function (btn){
    Way(btn)
  })
});

function Way(el) {
  if (window.outerWidth <= 992) {
    let test = el.getAttribute('data-way')
    el.href = "#" + test
  }
  else {
    el.removeAttribute('href');
    el.setAttribute('tabindex', '0');
  }
}

// events swiper
let eventsSwiper = new Swiper('.events-slider', {
  wrapperClass: 'events-slider__wrapper',
  slideClass: 'events-slider__slide',

  navigation: {
    nextEl: '.events__btn-next',
    prevEl: '.events__btn-prev',
  },

  pagination: {
    el: '.events-slider__pagination',
    type: 'bullets',
    clickable: true,
  },

  slidesPerView: 1,
  spaceBetween: 20,
  slidesPerGroup: 1,


  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 35,
      slidesPerGroup: 2,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  },

  a11y: {
    prevSlideMessage: 'Предыдущие события',
    nextSlideMessage: 'Следующие события',
    slideLabelMessage: '{{index}} из {{slidesLength}}',
    paginationBulletMessage: 'Перейти к событиям {{index}}',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  watchSlidesProgress:true,
  slideVisibleClass: 'swiper-slide-visible',
  on: {
    init: function () {
      this.slides.forEach(function (slide) {
        let slideLinks = slide.querySelector('.article__link');
        if (!slide.classList.contains("swiper-slide-visible")) {
          slide.tabIndex = "-1";
          slideLinks.tabIndex = "-1";
        }
        else {
          slide.tabIndex = "";
          slideLinks.tabIndex = "";
        }
      })
    },
    slideChange: function () {
      this.slides.forEach(function (slide) {
        let slideLinks = slide.querySelector('.article__link');
        if (!slide.classList.contains("swiper-slide-visible")) {
          slide.tabIndex = "-1";
          slideLinks.tabIndex = "-1";
        }
        else {
          slide.tabIndex = "";
          slideLinks.tabIndex = "";
        }
      })
    },
  },
})

// projects tooltip
tippy('.projects__tooltip', {
  theme: 'tooltip',
  maxWidth: 264,
});

// projects swiper
let projectsSwiper = new Swiper('.projects-slider', {
  wrapperClass: 'projects-slider__wrapper',
  slideClass: 'projects-slider__slide',

  navigation: {
    nextEl: '.projects__btn-next',
    prevEl: '.projects__btn-prev',
  },

  slidesPerView: 1,
  spaceBetween: 20,
  slidesPerGroup: 1,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 35,
      slidesPerGroup: 2,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
      slidesPerGroup: 2,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    },
  },

  a11y: {
    prevSlideMessage: 'Предыдущие партнеры',
    nextSlideMessage: 'Следующие партнеры',
    slideLabelMessage: '{{index}} из {{slidesLength}}',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  watchSlidesProgress:true,
  slideVisibleClass: 'swiper-slide-visible',
  on: {
    init: function () {
      this.slides.forEach(function (slide) {
        slide.tabIndex = "-1";
        let slideLink = slide.querySelector('.projects-slider__link');
        if (!slide.classList.contains("swiper-slide-visible")) {
          slideLink.tabIndex = "-1";
          }
        else {
          slideLink.tabIndex = "";
        }
      })
    },
    slideChange: function () {
      this.slides.forEach(function (slide) {
        slide.tabIndex = "-1";
        let slideLink = slide.childNodes;
        if (!slide.classList.contains("swiper-slide-visible")) {
          slideLink.tabIndex = "-1";
        }
        else {
          slideLink.tabIndex = "";
        }
      })
    },
  },
})

// input mask tel
const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+7(999) 999-99-99");

im.mask(selector);

// validate form
new window.JustValidate('.form', {
  rules: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    tel: {
      required: true,
      function: () => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },

  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Поле должно содержать более 3 символов',
      maxLength: 'Поле должно содержать не более 30 символов',
    },
    tel: {
      required: 'Вы не ввели телефон',
      function: 'Поле должно содержать 10 символов',
    },
    email: {
      required: 'Вы не ввели e-mail',
      email: 'Введен некорректный e-mail',
    },
  },

  colorWrong: '#D11616',

  submitHandler: function (thisForm, values, ajax) {
    ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      data: values,
      async: true,
      callback: function (response) {
        alert('Response from server: ' + response)
      },
      error: function (response) {
        alert('Response from server: ' + response)
      }
    });
  },
});

// contacts map
ymaps.ready(init);
function init(){
  let center = [55.75846806898367,37.60108850004083];

  let yandexMap = new ymaps.Map("map",
    {
      center: center,
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl'],
      autoFitToViewport: 'always',
    },
    {
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "280px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "200px", right: "20px" }
    }
  );

  let newPlacemark = new ymaps.Placemark(center, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/placeMark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -5]
  });

  yandexMap.geoObjects.add(newPlacemark);
  yandexMap.behaviors.disable(['scrollZoom']);
  yandexMap.behaviors.disable('drag');
  yandexMap.container.fitToViewport();
}
