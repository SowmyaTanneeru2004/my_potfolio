document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to Sowmya's Portfolio!");

    // Add the mobile menu toggle button
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    if (!document.querySelector('.menu-toggle')) {
        header.querySelector('.header-actions').prepend(menuToggle);
    }

    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!header.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.menu-toggle').innerHTML = '☰';
            }
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements when they come into view
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe elements that should be animated
const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .certification-card, .contact-item, .social-link');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Add animation class to CSS
const style = document.createElement('style');
style.textContent = `
    .skill-category, .project-card, .certification-card, .contact-item, .social-link {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card:nth-child(2n) {
        transition-delay: 0.2s;
    }
    
    .skill-category:nth-child(2n) {
        transition-delay: 0.1s;
    }
    
    .skill-category:nth-child(3n) {
        transition-delay: 0.2s;
    }
    
    .certification-card:nth-child(2n) {
        transition-delay: 0.1s;
    }
`;
document.head.appendChild(style);

// Header animation on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.6rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Typewriter effect for header subtitle
const headerText = document.querySelector('header p');
const text = headerText.textContent;
headerText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        headerText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener('load', typeWriter);

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skills list animation
const skillItems = document.querySelectorAll('.skills-list li');
skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'all 0.3s ease-out';
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-list').forEach(list => {
    skillsObserver.observe(list);
});

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// Add parallax effect to section backgrounds
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const scrollPosition = window.pageYOffset;
        const sectionOffset = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition > sectionOffset - window.innerHeight &&
            scrollPosition < sectionOffset + sectionHeight) {
            const yPos = (scrollPosition - sectionOffset) * 0.1;
            section.style.backgroundPosition = `center ${yPos}px`;
        }
    });
});

// Add dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.querySelector('.header-actions').appendChild(darkModeToggle);

// Add styles for dark mode toggle
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode-toggle {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0.3rem;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .dark-mode {
        --text-color: #e5e7eb;
        --light-text: #9ca3af;
        --background: #111827;
        --light-bg: #1f2937;
        --border-color: #374151;
        --card-bg: rgba(31, 41, 55, 0.9);
    }
    
    .dark-mode header,
    .dark-mode nav ul {
        background-color: rgba(17, 24, 39, 0.95);
    }
    
    .dark-mode .scroll-top {
        background: var(--gradient-primary);
    }
    
    .dark-mode footer {
        background-color: #0f172a;
    }
    
    @media (max-width: 768px) {
        .dark-mode-toggle {
            position: absolute;
            top: 1.5rem;
            right: 4rem;
        }
    }
`;
document.head.appendChild(darkModeStyles);

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}