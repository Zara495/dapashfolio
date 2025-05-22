// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
    
    // Add active class to links and buttons on hover
    const links = document.querySelectorAll('a, button, .filter-btn, .social-icon');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let menuOpen = false;
    
    menuBtn.addEventListener('click', function() {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
            menuOpen = false;
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
            menuOpen = false;
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== TYPING EFFECT =====
    const typingElement = document.querySelector('.typing');
    const professions = ['Full Stack Developer', 'Penetration Tester', 'Graphic Designer', 'Software Developer', 'Database Engineer'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function typeText() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        if (!isDeleting && charIndex === currentProfession.length) {
            isDeleting = true;
            typingDelay = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingDelay = 500; // Pause before typing next
        }
        
        setTimeout(typeText, typingDelay);
    }
    
    // Start the typing effect
    setTimeout(typeText, 1000);
    
    // ===== SKILL PROGRESS ANIMATION =====
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgress.forEach(progress => {
            const value = progress.getAttribute('data-progress');
            progress.style.width = value + '%';
        });
    }
    
    // Animate skills when they come into view
    const skillsSection = document.querySelector('.skills');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);
    
    // ===== PROJECT FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // ===== TESTIMONIAL SLIDER =====
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function goToSlide(index) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active dot
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        testimonialDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        goToSlide(currentSlide);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(currentSlide);
        }, 5000);
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it to the console
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you can replace this with a proper notification)
        alert('Message sent successfully!');
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const navLinks = document.querySelectorAll('header .nav-links a, .mobile-nav a, .scroll-indicator a, .hero a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Adjust for header height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (menuOpen) {
                        menuBtn.classList.remove('open');
                        mobileNav.classList.remove('open');
                        document.body.style.overflow = '';
                        menuOpen = false;
                    }
                }
            }
        });
    });
    
    // ===== ACTIVE NAVIGATION LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // ===== PARTICLES BACKGROUND =====
    // Simple particles effect for the hero section
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        const particlesCount = 100;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: var(--primary-color);
                border-radius: 50%;
                opacity: ${opacity};
                animation: float ${duration}s linear infinite;
                animation-delay: -${Math.random() * 20}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // ===== INITIALIZE AOS ANIMATION =====
    // If you want to add AOS (Animate On Scroll) library, you can initialize it here
    // AOS.init({
    //     duration: 1000,
    //     once: true
    // });
});