function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
        
        const titles = {
            'home': 'Proxiom.ai - Intelligent Software Troubleshooting',
            'solution': 'Sootro Solution - Proxiom.ai',
            'features': 'Features - Proxiom.ai',
            'architecture': 'Architecture - Proxiom.ai',
            'pricing': 'Pricing - Proxiom.ai',
            'about': 'About Us - Proxiom.ai',
            'contact': 'Contact - Proxiom.ai',
            'demo': 'Request Demo - Proxiom.ai'
        };
        
        document.title = titles[pageId] || 'Proxiom.ai';
    }
}

// Form submission handling
function handleFormSubmission(formId, successMessageId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successMessageId);
    
    if (!form || !successMessage) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        form.classList.add('form-submitting');
        const buttonText = form.querySelector('.button-text');
        if (buttonText) {
            buttonText.textContent = 'Sending...';
        }
        
        // Create FormData object
        const formData = new FormData(form);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.classList.add('show');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                form.classList.remove('form-submitting');
                if (buttonText) {
                    buttonText.textContent = formId === 'contact-form' ? 'Send Message' : 'Schedule Demo';
                }
                
                // Hide success message and show form again after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    form.style.display = 'block';
                }, 5000);
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            
            // Remove loading state
            form.classList.remove('form-submitting');
            if (buttonText) {
                buttonText.textContent = formId === 'contact-form' ? 'Send Message' : 'Schedule Demo';
            }
            
            // Show error message
            alert('There was an error submitting the form. Please try again or email us directly.');
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    handleFormSubmission('contact-form', 'contact-success-message');
    handleFormSubmission('demo-form', 'demo-success-message');
    
    // Initialize scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});

// Handle form submissions (duplicate, keeping for now as per original structure)
document.addEventListener('DOMContentLoaded', function() {
    // Remove all form submission handling - let Netlify handle it
    // Forms will now submit properly to Netlify
    
    // Initialize scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});
 
// Handle navigation highlight
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(current)) {
            link.classList.add('active');
        }
    });
});
