// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle Buy Now button clicks
    const buyButtons = document.querySelectorAll('.buy-btn');
    const modal = document.getElementById('purchase-modal');
    const modalItemName = document.getElementById('modal-item-name');
    const closeModal = document.querySelector('.close-modal');

    // Function to show the modal
    function showModal(itemName) {
        modalItemName.textContent = itemName;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close the modal
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Add click event listeners to all Buy Now buttons
    if (buyButtons) {
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-item');
                showModal(itemName);
            });
        });
    }

    // Close the modal when the close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Close the modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                hideModal();
            }
        });
    }

    // Close the modal when ESC key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            hideModal();
        }
    });

    // Add scroll animation for smoother navigation
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll animations
    const animateElements = (elements, threshold = 0.2) => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementPosition.top < windowHeight * (1 - threshold)) {
                element.classList.add('animate-in');
            } else {
                element.classList.remove('animate-in');
            }
        });
    };

    // Get all elements that need to be animated
    const featureCards = document.querySelectorAll('.feature-card');
    const shopItems = document.querySelectorAll('.shop-item');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const sections = document.querySelectorAll('section');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Initialize elements with starting animation states
    const initializeElements = () => {
        // Feature cards animation
        if (featureCards.length > 0) {
            featureCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            });
        }
        
        // Shop items animation
        if (shopItems.length > 0) {
            shopItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(40px)';
                item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
            });
        }
        
        // Testimonial cards animation
        if (testimonials.length > 0) {
            testimonials.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            });
        }
        
        // Section animations
        if (sections.length > 0) {
            sections.forEach(section => {
                if (!section.classList.contains('hero')) {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(30px)';
                    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                }
            });
        }
        
        // Hero content and image animations
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateX(-50px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(50px)';
            heroImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        }
    };
    
    // Animate elements when they enter the viewport
    const handleScroll = () => {
        animateElements(featureCards);
        animateElements(shopItems);
        animateElements(testimonials);
        animateElements(sections, 0.1);
        
        if (heroContent) {
            const heroPosition = heroContent.getBoundingClientRect();
            if (heroPosition.top < window.innerHeight * 0.8) {
                heroContent.classList.add('animate-in');
            }
        }
        
        if (heroImage) {
            const imagePosition = heroImage.getBoundingClientRect();
            if (imagePosition.top < window.innerHeight * 0.8) {
                heroImage.classList.add('animate-in');
            }
        }
    };
    
    // Initialize and run animations
    initializeElements();
    
    // Add animation classes to CSS
    document.body.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transform: translateX(0) !important;
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px rgba(0, 168, 255, 0.3); }
                50% { box-shadow: 0 0 20px rgba(0, 168, 255, 0.6); }
            }
            
            @keyframes slideFromBottom {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideFromLeft {
                from { transform: translateX(-50px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideFromRight {
                from { transform: translateX(50px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .btn:hover::after {
                transform: translateX(0);
            }
        </style>
    `);
    
    // Execute animations once on page load
    setTimeout(() => {
        handleScroll();
        // Add scroll event listener for continuous animations
        window.addEventListener('scroll', handleScroll);
    }, 100);

    // Mobile navigation toggle
    const navLinks = document.querySelector('.nav-links');
    
    // Cursor animation effect - follows mouse
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-effect');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor animation styles
    document.body.insertAdjacentHTML('beforeend', `
        <style>
            .cursor-effect {
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: rgba(0, 168, 255, 0.3);
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s, background-color 0.2s;
                mix-blend-mode: screen;
            }
            
            a:hover ~ .cursor-effect,
            button:hover ~ .cursor-effect {
                width: 40px;
                height: 40px;
                background-color: rgba(0, 168, 255, 0.15);
            }
        </style>
    `);
});
