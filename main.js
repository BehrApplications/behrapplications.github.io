// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
fqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

// Contact Form Validation and Submission
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation (add more as needed)
    const email = contactForm.querySelector('input[type=\"email\"]').value;
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    // Simulating submission, add actual submission logic
    alert('Form submitted!');
});

// Newsletter Signup
const newsletterForm = document.querySelector('#newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add actual signup logic
    alert('Signed up for the newsletter!');
});

// Smooth Scrolling
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Loading Indicators
const submitButtons = document.querySelectorAll('button[type=\"submit\"]');
submitButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.innerHTML = 'Loading...';
        button.disabled = true;
        // Simulated delay for loading
        setTimeout(() => {
            button.innerHTML = 'Submit';
            button.disabled = false;
        }, 2000);
    });
});
