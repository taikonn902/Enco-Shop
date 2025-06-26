document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility for both password fields
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        });
    }

    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        });
    }

    // Custom checkbox functionality for terms agreement
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const termsCheckmark = document.querySelector('#agreeTerms + div i');
    
    if (agreeTermsCheckbox && termsCheckmark) {
        agreeTermsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                termsCheckmark.style.opacity = '1';
                termsCheckmark.parentElement.style.background = '#55D5D2';
                termsCheckmark.parentElement.style.borderColor = '#55D5D2';
            } else {
                termsCheckmark.style.opacity = '0';
                termsCheckmark.parentElement.style.background = '#e5e7eb';
                termsCheckmark.parentElement.style.borderColor = '#d1d5db';
            }
        });
    }

    // Form submission
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Basic validation
            if (!fullName || !email || !phone || !password || !confirmPassword) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Email không hợp lệ!', 'error');
                return;
            }
            
            if (!isValidPhone(phone)) {
                showNotification('Số điện thoại không hợp lệ!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }
            
            if (!agreeTerms) {
                showNotification('Vui lòng đồng ý với điều khoản sử dụng!', 'error');
                return;
            }
            
            // Simulate registration process
            const registerBtn = this.querySelector('button[type="submit"]');
            const originalText = registerBtn.innerHTML;
            
            // Show loading state
            registerBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Đang đăng ký...</span>
                </div>
            `;
            registerBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                registerBtn.innerHTML = originalText;
                registerBtn.disabled = false;
                
                // Show success message
                showNotification('Đăng ký thành công! Chào mừng bạn đến với Enco Shop!', 'success');
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 3000);
        });
    }

    // Social register buttons
    const socialButtons = document.querySelectorAll('.w-full.relative.group button');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.querySelector('span')?.textContent || 'Đăng ký';
            showNotification(`${buttonText} - Tính năng đang phát triển!`, 'info');
        });
    });

    // Input focus effects
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
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

    // Real-time password confirmation validation
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && passwordInput.value !== this.value) {
                this.parentElement.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                this.parentElement.parentElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else if (this.value && passwordInput.value === this.value) {
                this.parentElement.parentElement.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                this.parentElement.parentElement.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
            } else {
                this.parentElement.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                this.parentElement.parentElement.style.boxShadow = 'none';
            }
        });

        passwordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
                confirmPasswordInput.parentElement.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                confirmPasswordInput.parentElement.parentElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else if (confirmPasswordInput.value && this.value === confirmPasswordInput.value) {
                confirmPasswordInput.parentElement.parentElement.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                confirmPasswordInput.parentElement.parentElement.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
            } else {
                confirmPasswordInput.parentElement.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                confirmPasswordInput.parentElement.parentElement.style.boxShadow = 'none';
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation function for Vietnamese phone numbers
    function isValidPhone(phone) {
        const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;
        return phoneRegex.test(phone);
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

    // Add smooth scrolling for anchor links
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

    // Add loading animation for page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}); 