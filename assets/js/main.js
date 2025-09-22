// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1500);
});

// Navigation
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Scroll effects
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});



  const backToTop = document.getElementById("backToTop");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    // Navbar scroll effect
    if (navbar && window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else if (navbar) {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  });

  // Mobile menu toggle


  // Back to top functionality
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

// Testimonials slider
let slideIndex = 1;
const slides = document.getElementsByClassName("testimonial-slide");
const dots = document.getElementsByClassName("dot");

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

// Auto slide
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 5000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll(".price-card, .feature-card, .info-card, .gallery-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Parallax effect on scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-bg");

  parallaxElements.forEach((el) => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Dynamic stats counter
const stats = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const value = target.innerText;
        let current = 0;
        const increment = parseInt(value) / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= parseInt(value)) {
            target.innerText = value;
            clearInterval(timer);
          } else {
            target.innerText =
              Math.floor(current) +
              (value.includes("₽") ? "₽" : value.includes("м") ? "м" : "+");
          }
        }, 30);
        statsObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.5 }
);

stats.forEach((stat) => statsObserver.observe(stat));

// Mouse move effect for hero section
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// Lazy loading simulation for gallery
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Add ripple effect on buttons
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Performance optimization - throttle scroll events
let ticking = false;
function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

function updateOnScroll() {
  // Update animations based on scroll
  ticking = false;
}

window.addEventListener("scroll", requestTick);

console.log(
  "🍂 Добро пожаловать на ярмарку! Сайт полностью загружен и готов к работе."
);


const projectsCarousel = document.querySelector(".carousel-track");
if (projectsCarousel) {
  const projectSlides = Array.from(projectsCarousel.children);
  const projectsNextBtn = document.querySelector(".projects-section .carousel-next");
  const projectsPrevBtn = document.querySelector(".projects-section .carousel-prev");

  let projectIndex = 0;

  function slidesToShow() {
    return window.innerWidth > 968 ? 3 : window.innerWidth > 640 ? 2 : 1;
  }

  function updateProjectsCarousel() {
    const visible = slidesToShow();
    const slideWidth = 100 / visible;
    projectsCarousel.style.transform = `translateX(-${projectIndex * slideWidth}%)`;
  }

  function goNext() {
    projectIndex++;
    if (projectIndex > projectSlides.length - slidesToShow()) {
      projectIndex = 0; // возвращаемся в начало
    }
    updateProjectsCarousel();
  }

  function goPrev() {
    projectIndex--;
    if (projectIndex < 0) {
      projectIndex = projectSlides.length - slidesToShow(); // прыжок в конец
    }
    updateProjectsCarousel();
  }

  if (projectsNextBtn) projectsNextBtn.addEventListener("click", goNext);
  if (projectsPrevBtn) projectsPrevBtn.addEventListener("click", goPrev);

  // autoplay (loop)
  setInterval(goNext, 5000);

  updateProjectsCarousel();
}