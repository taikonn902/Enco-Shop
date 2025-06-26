document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        });
    }

    // Custom checkbox functionality
    const rememberCheckbox = document.getElementById('remember');
    const checkmark = document.querySelector('.w-4.h-4 i');
    
    if (rememberCheckbox && checkmark) {
        rememberCheckbox.addEventListener('change', function() {
            if (this.checked) {
                checkmark.style.opacity = '1';
                checkmark.parentElement.style.background = '#55D5D2';
                checkmark.parentElement.style.borderColor = '#55D5D2';
            } else {
                checkmark.style.opacity = '0';
                checkmark.parentElement.style.background = '#e5e7eb';
                checkmark.parentElement.style.borderColor = '#d1d5db';
            }
        });
    }

    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Basic validation
            if (!email || !password) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Email không hợp lệ!', 'error');
                return;
            }
            
            // Simulate login process
            const loginBtn = this.querySelector('button[type="submit"]');
            const originalText = loginBtn.innerHTML;
            
            // Show loading state
            loginBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Đang đăng nhập...</span>
                </div>
            `;
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
                
                // Show success message
                showNotification('Đăng nhập thành công!', 'success');
                
                // Redirect to home page after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 2000);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn, .w-full.relative.group button');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.querySelector('span')?.textContent || 'Đăng nhập';
            showNotification(`${buttonText} - Tính năng đang phát triển!`, 'info');
        });
    });

    // Input focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            this.parentElement.parentElement.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.parentElement.parentElement.style.boxShadow = 'none';
        });
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-xl border transform translate-x-full transition-all duration-500 max-w-sm`;
        
        // Set notification styles based on type
        switch(type) {
            case 'success':
                notification.style.background = 'rgba(34, 197, 94, 0.9)';
                notification.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                notification.style.color = 'white';
                break;
            case 'error':
                notification.style.background = 'rgba(239, 68, 68, 0.9)';
                notification.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                notification.style.color = 'white';
                break;
            case 'info':
            default:
                notification.style.background = 'rgba(59, 130, 246, 0.9)';
                notification.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                notification.style.color = 'white';
                break;
        }
        
        // Add icon based on type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle mr-2"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
                break;
            case 'info':
            default:
                icon = '<i class="fas fa-info-circle mr-2"></i>';
                break;
        }
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    ${icon}
                    <span class="font-medium">${message}</span>
                </div>
                <button class="ml-4 text-white/80 hover:text-white transition-colors duration-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        });
    }

    // Add floating animation to background elements
    const floatingShapes = document.querySelectorAll('.animate-bounce');
    floatingShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
        shape.style.animationDuration = '3s';
    });

    // Add hover effects to social buttons
    const socialLoginButtons = document.querySelectorAll('.space-y-3 button');
    socialLoginButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
            const form = document.getElementById('loginForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.type !== 'checkbox') {
                    input.value = '';
                }
            });
            document.getElementById('remember').checked = false;
            if (checkmark) {
                checkmark.style.opacity = '0';
                checkmark.parentElement.style.background = '#e5e7eb';
                checkmark.parentElement.style.borderColor = '#d1d5db';
            }
        }
    });
}); 