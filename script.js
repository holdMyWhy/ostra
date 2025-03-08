document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const registerBtns = document.querySelectorAll('#register-btn, #hero-register-btn, #overview-register-btn');
    const popup = document.getElementById('registration-popup');
    const closePopup = document.querySelector('.close-popup');
    const form = document.getElementById('registration-form');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    // Event listeners for registration buttons
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
        });
    });
    
    // Close popup
    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close popup when clicking outside of content
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            nationality: document.getElementById('nationality').value,
            terms: document.getElementById('terms').checked
        };
        
        // Log the form data (in a real implementation, you would send this to your server)
        console.log('Form submitted:', formData);
        
        // In a real scenario, you would use fetch() to submit this data to your server or API
        // For this example, we'll just show a success message and reset the form
        
        // Success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = '#d4edda';
        successMessage.style.color = '#155724';
        successMessage.style.borderRadius = '4px';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        successMessage.innerHTML = '<strong>Thank you for your interest!</strong><br>We will contact you shortly with more information.';
        
        // Clear form and show success message
        form.reset();
        form.appendChild(successMessage);
        
        // Close popup after 3 seconds
        setTimeout(function() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Remove success message for next time
            successMessage.remove();
        }, 3000);
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate the position with offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        nav.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Add fixed header class on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#dc3545';
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
});