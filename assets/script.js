// Form validation and submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("leadForm");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let country = document.getElementById("country").value;

        // Reset previous error states
        resetErrors();

        // Validation
        let isValid = true;
        if (!name) {
            showError("name", "Name is required");
            isValid = false;
        } else if (name.length < 3) {
            showError("name", "Name must be at least 3 characters long");
            isValid = false;
        } else if (!isValidName(name)) {
            showError("name", "Name must not contain numbers or special characters");
            isValid = false;
        }

        if (!email || !isValidEmail(email)) {
            showError("email", "Please enter a valid email address");
            isValid = false;
        }

        if (!phone || !isValidPhone(phone)) {
            showError("phone", "Please enter a valid phone number (min 10 digits)");
            isValid = false;
        }

        if (!country) {
            showError("country", "Please select a country");
            isValid = false;
        }

        if (isValid) {
            // Show success message with animation
            showSuccessMessage();
            // Track form submission
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Lead',
                    'event_label': 'Application Form',
                    'country': country
                });
            }
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        }
    });

    // Add input validation on blur
    ['name', 'email', 'phone'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        }
    });
});

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name); 
}

function validateField(field) {
    resetErrors(field);
    let isValid = true;

    switch(field.id) {
        case 'name':
            if (!field.value.trim()) {
                showError(field.id, "Name is required");
                isValid = false;
            } else if (field.value.trim().length < 3) {
                showError(field.id, "Name must be at least 3 characters long");
                isValid = false;
            } else if (!isValidName(field.value.trim())) {
                showError(field.id, "Name must not contain numbers or special characters");
                isValid = false;
            }
            break;
        case 'email':
            if (!isValidEmail(field.value.trim())) {
                showError(field.id, "Please enter a valid email");
                isValid = false;
            }
            break;
        case 'phone':
            if (!isValidPhone(field.value.trim())) {
                showError(field.id, "Please enter a valid phone number");
                isValid = false;
            }
            break;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('border-red-500');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1 animate__animated animate__fadeIn';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function resetErrors(field = null) {
    const elements = field ? [field] : document.querySelectorAll('#leadForm input, #leadForm select');
    elements.forEach(element => {
        element.classList.remove('border-red-500');
        const errorMessage = element.parentNode.querySelector('.text-red-500');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage() {
    const form = document.getElementById("leadForm");
    if (!form) return;

    form.innerHTML = `
        <div class="text-center py-8 animate__animated animate__fadeIn">
            <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
            <p class="text-gray-600">We'll contact you shortly with more information.</p>
        </div>
    `;
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('bg-opacity-95', 'shadow-lg');
        } else {
            header.classList.remove('bg-opacity-95', 'shadow-lg');
        }
    }
});

// Toggle effect for menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});
