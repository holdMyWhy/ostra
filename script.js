document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const registerBtns = document.querySelectorAll('#register-interest-btn, #about-register-btn, #cta-register-btn');
    const popup = document.getElementById('registration-popup');
    const closePopup = document.querySelector('.close-popup');
    const form = document.getElementById('registration-form');
    const menuTrigger = document.querySelector('.menu-trigger');
    const topBar = document.querySelector('.top-bar');
    
    // Show/hide registration popup
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close popup
    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close popup when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Menu trigger animation
    menuTrigger.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Here you would typically toggle a menu, but for this demo,
        // we'll just animate the hamburger icon
        const spans = this.querySelectorAll('span');
        
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            topBar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            topBar.style.padding = '15px 0';
        } else {
            topBar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            topBar.style.padding = '20px 0';
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
        
        console.log('Form submitted:', formData);
        
        // Display success message
        const formElements = form.querySelectorAll('input, select, button');
        formElements.forEach(el => {
            el.style.display = 'none';
        });
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank You!</h3>
            <p>Your registration of interest for Palace Villas Ostra has been received.</p>
            <p>Our property consultant will contact you shortly.</p>
        `;
        
        form.appendChild(successMessage);
        
        // Reset and close form after delay
        setTimeout(function() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form for next time
            setTimeout(function() {
                form.reset();
                formElements.forEach(el => {
                    el.style.display = '';
                });
                successMessage.remove();
            }, 500);
        }, 3000);
    });
    
    // Form validation enhancements
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        // Add focus styling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validate on blur
            if (this.value === '' && this.hasAttribute('required')) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Add subtle animation to features on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    window.addEventListener('scroll', function() {
        featureItems.forEach(item => {
            const position = item.getBoundingClientRect();
            
            // Check if element is in viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initialize features with opacity 0 and transform for animation
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger scroll event to check initial positions
    window.dispatchEvent(new Event('scroll'));
});