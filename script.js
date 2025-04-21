// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form data to server
            fetch('process_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                showMessage('Error sending message. Please try again.', 'error');
                console.error('Error:', error);
            });
        });
    }

    // Check URL for status message
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    
    if (status === 'success') {
        showMessage('Message sent successfully!', 'success');
    } else if (status === 'error') {
        showMessage(message || 'Error sending message. Please try again.', 'error');
    }
});

function showMessage(message, type) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Add to form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Fade-in animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Start slideshow
showSlide(0);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Workshop Slideshow functionality
const workshopSlides = document.querySelectorAll('.workshop-slide');
const prevWorkshopButton = document.querySelector('.prev-slide');
const nextWorkshopButton = document.querySelector('.next-slide');
let currentWorkshopSlide = 0;

function showWorkshopSlide(index) {
    workshopSlides.forEach(slide => slide.classList.remove('active'));
    workshopSlides[index].classList.add('active');
}

function nextWorkshopSlide() {
    currentWorkshopSlide = (currentWorkshopSlide + 1) % workshopSlides.length;
    showWorkshopSlide(currentWorkshopSlide);
}

function prevWorkshopSlide() {
    currentWorkshopSlide = (currentWorkshopSlide - 1 + workshopSlides.length) % workshopSlides.length;
    showWorkshopSlide(currentWorkshopSlide);
}

// Drone Slideshow functionality
const droneSlides = document.querySelectorAll('.drone-slide');
const prevDroneButton = document.querySelector('.prev-drone-slide');
const nextDroneButton = document.querySelector('.next-drone-slide');
let currentDroneSlide = 0;

function showDroneSlide(index) {
    droneSlides.forEach(slide => slide.classList.remove('active'));
    droneSlides[index].classList.add('active');
}

function nextDroneSlide() {
    currentDroneSlide = (currentDroneSlide + 1) % droneSlides.length;
    showDroneSlide(currentDroneSlide);
}

function prevDroneSlide() {
    currentDroneSlide = (currentDroneSlide - 1 + droneSlides.length) % droneSlides.length;
    showDroneSlide(currentDroneSlide);
}

// Start both slideshows
showWorkshopSlide(0);
showDroneSlide(0);

// Add event listeners for workshop buttons
prevWorkshopButton.addEventListener('click', prevWorkshopSlide);
nextWorkshopButton.addEventListener('click', nextWorkshopSlide);

// Add event listeners for drone buttons
prevDroneButton.addEventListener('click', prevDroneSlide);
nextDroneButton.addEventListener('click', nextDroneSlide);

// Auto-advance both slideshows
setInterval(nextWorkshopSlide, 5000);
setInterval(nextDroneSlide, 5000);

// Mobile swipe functionality for workshop slideshow
let workshopTouchStartX = 0;
let workshopTouchEndX = 0;
const workshopContainer = document.querySelector('.workshop-slideshow-container');

workshopContainer.addEventListener('touchstart', (e) => {
    workshopTouchStartX = e.changedTouches[0].screenX;
});

workshopContainer.addEventListener('touchend', (e) => {
    workshopTouchEndX = e.changedTouches[0].screenX;
    handleWorkshopSwipe();
});

function handleWorkshopSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = workshopTouchEndX - workshopTouchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevWorkshopSlide();
        } else {
            nextWorkshopSlide();
        }
    }
}

// Mobile swipe functionality for drone slideshow
let droneTouchStartX = 0;
let droneTouchEndX = 0;
const droneContainer = document.querySelector('.drone-slideshow-container');

droneContainer.addEventListener('touchstart', (e) => {
    droneTouchStartX = e.changedTouches[0].screenX;
});

droneContainer.addEventListener('touchend', (e) => {
    droneTouchEndX = e.changedTouches[0].screenX;
    handleDroneSwipe();
});

function handleDroneSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = droneTouchEndX - droneTouchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevDroneSlide();
        } else {
            nextDroneSlide();
        }
    }
}

// Event Modal functionality
const eventCards = document.querySelectorAll('.event-card');
const modal = document.getElementById('eventModal');
const closeModal = document.querySelector('.close-modal');
const modalDate = document.getElementById('modalDate');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalRequirements = document.getElementById('modalRequirements');
const modalWebsite = document.getElementById('modalWebsite');
const websiteIframe = modalWebsite.querySelector('iframe');

// Event data
const eventData = {
    1: {
        date: "April 15, 2025",
        title: "Advanced Drone Workshop",
        description: "Join us for an exclusive workshop showcasing our drone's advanced capabilities and features. Learn about autonomous flight, computer vision, and real-time data processing.",
        requirements: [
            "Basic understanding of drone technology",
            "Interest in autonomous systems",
            "Laptop for hands-on activities"
        ]
    },
    2: {
        date: "June 22-24, 2025",
        title: "SUAS Competition",
        description: "Making history as the first Australian team to compete in the prestigious SUAS competition in the USA.",
        requirements: [
            "Team membership",
            "Valid passport",
            "Travel insurance"
        ],
        website: "https://suas-competition.org"
    },
    3: {
        date: "Week one of June 2025",
        title: "Pre-Competition Showcase",
        description: "",
        requirements: []
    }
};

// Open modal when clicking on event card
eventCards.forEach(card => {
    card.addEventListener('click', () => {
        const eventId = card.getAttribute('data-event');
        showEventModal(eventId);
    });
});

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

function showEventModal(eventId) {
    const event = eventData[eventId];
    const modal = document.getElementById('eventModal');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalRequirements = document.getElementById('modalRequirements');
    const modalWebsite = document.getElementById('modalWebsite');
    const websiteIframe = modalWebsite.querySelector('iframe');

    modalDate.textContent = event.date;
    modalTitle.textContent = event.title;
    modalDescription.textContent = event.description;
    
    // Clear previous requirements
    modalRequirements.innerHTML = '';
    
    // Add requirements if they exist
    if (event.requirements && event.requirements.length > 0) {
        event.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            modalRequirements.appendChild(li);
        });
    }
    
    // Handle website iframe
    if (event.website) {
        modalWebsite.style.display = 'block';
        websiteIframe.src = event.website;
    } else {
        modalWebsite.style.display = 'none';
        websiteIframe.src = '';
    }

    modal.style.display = 'block';
}

// Scroll down slightly when the page loads
window.addEventListener('load', function() {
    // Scroll down by 500 pixels after a short delay to ensure everything is loaded
    setTimeout(function() {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }, 500);
}); 