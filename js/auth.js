// ==================== AUTHENTICATION MODULE ====================
// Secure authentication system with password hashing and session management

// Simple hash function for password security (in production, use bcrypt on backend)
function hashPassword(password) {
   let hash = 0;
   const salt = "AishaMartSecure2024"; // Salt for additional security
   const str = password + salt;
   
   for (let i = 0; i < str.length; i++) {
       const char = str.charCodeAt(i);
       hash = ((hash << 5) - hash) + char;
       hash = hash & hash; // Convert to 32-bit integer
   }
   
   // Return a more secure looking hash
   return 'AM' + Math.abs(hash).toString(16) + 'HASH';
}

// Validate email format
function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password) {
   const errors = [];
   
   if (password.length < 6) {
       errors.push('Password must be at least 6 characters long');
   }
   
   if (!/[A-Za-z]/.test(password)) {
       errors.push('Password must contain at least one letter');
   }
   
   return {
       valid: errors.length === 0,
       errors: errors
   };
}

// ==================== USER REGISTRATION ====================
function registerUser(name, email, password, confirmPassword) {
   // Clear previous errors
   clearAllErrors();
   
   // Validation checks
   if (!name || !email || !password || !confirmPassword) {
       showError('signupNameError', 'All fields are required');
       return { success: false, message: 'All fields are required' };
   }
   
   // Validate name
   if (name.trim().length < 2) {
       showError('signupNameError', 'Name must be at least 2 characters');
       return { success: false, message: 'Name must be at least 2 characters' };
   }
   
   // Validate email
   if (!isValidEmail(email)) {
       showError('signupEmailError', 'Please enter a valid email address');
       return { success: false, message: 'Please enter a valid email address' };
   }
   
   // Validate password
   const passwordValidation = validatePassword(password);
   if (!passwordValidation.valid) {
       showError('signupPasswordError', passwordValidation.errors[0]);
       return { success: false, message: passwordValidation.errors[0] };
   }
   
   // Check password match
   if (password !== confirmPassword) {
       showError('signupConfirmPasswordError', 'Passwords do not match');
       return { success: false, message: 'Passwords do not match' };
   }
   
   // Get existing users
   const users = JSON.parse(localStorage.getItem('aishamart_users')) || [];
   
   // Check for duplicate email
   const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
   if (existingUser) {
       showError('signupEmailError', 'This email is already registered');
       return { success: false, message: 'Email already registered. Please sign in instead.' };
   }
   
   // Create new user with hashed password
   const newUser = {
       id: Date.now(),
       name: name.trim(),
       email: email.toLowerCase().trim(),
       password: hashPassword(password), // Store hashed password
       createdAt: new Date().toISOString(),
       isActive: true
   };
   
   // Save user to localStorage (simulating database)
   users.push(newUser);
   localStorage.setItem('aishamart_users', JSON.stringify(users));
   
   // Log registration for debugging
   console.log('✅ User registered successfully:', { id: newUser.id, name: newUser.name, email: newUser.email });
   
   return { 
       success: true, 
       message: 'Registration successful! Redirecting to login...',
       user: {
           id: newUser.id,
           name: newUser.name,
           email: newUser.email
       }
   };
}

// ==================== USER LOGIN ====================
function loginUser(email, password, rememberMe = false) {
   // Clear previous errors
   clearAllErrors();
   
   // Validation checks
   if (!email || !password) {
       showError('loginEmailError', 'Email and password are required');
       return { success: false, message: 'Email and password are required' };
   }
   
   // Validate email format
   if (!isValidEmail(email)) {
       showError('loginEmailError', 'Please enter a valid email address');
       return { success: false, message: 'Please enter a valid email address' };
   }
   
   // Get users from localStorage
   const users = JSON.parse(localStorage.getItem('aishamart_users')) || [];
   
   // Find user by email
   const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
   
   if (!user) {
       showError('loginEmailError', 'No account found with this email');
       return { success: false, message: 'Email not found. Please check your email or sign up.' };
   }
   
   // Check if account is active
   if (!user.isActive) {
       showError('loginPasswordError', 'This account has been deactivated');
       return { success: false, message: 'Account deactivated. Please contact support.' };
   }
   
   // Verify password
   const hashedPassword = hashPassword(password);
   if (user.password !== hashedPassword) {
       showError('loginPasswordError', 'Incorrect password');
       return { success: false, message: 'Incorrect password. Please try again.' };
   }
   
   // Create session
   const session = {
       id: user.id,
       name: user.name,
       email: user.email,
       loginTime: new Date().toISOString(),
       rememberMe: rememberMe
   };
   
   // Save session
   if (rememberMe) {
       localStorage.setItem('aishamart_session', JSON.stringify(session));
   } else {
       sessionStorage.setItem('aishamart_session', JSON.stringify(session));
   }
   
   // Also keep a legacy user object for backward compatibility
   localStorage.setItem('aishamart_user', JSON.stringify({
       id: user.id,
       name: user.name,
       email: user.email
   }));
   
   // Log successful login
   console.log('✅ User logged in successfully:', { id: user.id, name: user.name, email: user.email });
   
   return { 
       success: true, 
       message: 'Login successful! Redirecting...',
       user: {
           id: user.id,
           name: user.name,
           email: user.email
       }
   };
}

// ==================== SESSION MANAGEMENT ====================
function getCurrentSession() {
   // Check sessionStorage first (current session)
   let session = sessionStorage.getItem('aishamart_session');
   
   // If not found, check localStorage (remember me)
   if (!session) {
       session = localStorage.getItem('aishamart_session');
   }
   
   if (session) {
       try {
           return JSON.parse(session);
       } catch (e) {
           console.error('Failed to parse session:', e);
           return null;
       }
   }
   
   return null;
}

function isUserLoggedIn() {
   return getCurrentSession() !== null;
}

function getLoggedInUser() {
   const session = getCurrentSession();
   if (session) {
       return {
           id: session.id,
           name: session.name,
           email: session.email
       };
   }
   return null;
}

function logoutUser() {
   // Clear all authentication data
   sessionStorage.removeItem('aishamart_session');
   localStorage.removeItem('aishamart_session');
   localStorage.removeItem('aishamart_user');
   
   console.log('✅ User logged out successfully');
   
   return { success: true, message: 'Logged out successfully' };
}

// ==================== UI HELPER FUNCTIONS ====================
function showError(elementId, message) {
   const errorElement = document.getElementById(elementId);
   if (errorElement) {
       errorElement.textContent = message;
       errorElement.style.display = 'block';
       errorElement.style.color = '#E53935';
       errorElement.style.fontSize = '0.875rem';
       errorElement.style.marginTop = '0.25rem';
   }
}

function clearError(elementId) {
   const errorElement = document.getElementById(elementId);
   if (errorElement) {
       errorElement.textContent = '';
       errorElement.style.display = 'none';
   }
}

function clearAllErrors() {
   const errorElements = document.querySelectorAll('.form-error');
   errorElements.forEach(element => {
       element.textContent = '';
       element.style.display = 'none';
   });
}

function showSuccessMessage(message) {
   // Create success notification
   const notification = document.createElement('div');
   notification.style.cssText = `
       position: fixed;
       top: 100px;
       right: 20px;
       background: #43A047;
       color: white;
       padding: 1rem 1.5rem;
       border-radius: 8px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
       z-index: 10000;
       font-family: 'Roboto', sans-serif;
       animation: slideInRight 0.3s ease-out;
   `;
   notification.textContent = message;
   
   document.body.appendChild(notification);
   
   setTimeout(() => {
       notification.style.animation = 'slideOutRight 0.3s ease-out';
       setTimeout(() => notification.remove(), 300);
   }, 3000);
}

function showErrorMessage(message) {
   // Create error notification
   const notification = document.createElement('div');
   notification.style.cssText = `
       position: fixed;
       top: 100px;
       right: 20px;
       background: #E53935;
       color: white;
       padding: 1rem 1.5rem;
       border-radius: 8px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
       z-index: 10000;
       font-family: 'Roboto', sans-serif;
       animation: slideInRight 0.3s ease-out;
   `;
   notification.textContent = message;
   
   document.body.appendChild(notification);
   
   setTimeout(() => {
       notification.style.animation = 'slideOutRight 0.3s ease-out';
       setTimeout(() => notification.remove(), 300);
   }, 4000);
}

// Add animation styles
const authStyles = document.createElement('style');
authStyles.textContent = `
   @keyframes slideInRight {
       from {
           transform: translateX(400px);
           opacity: 0;
       }
       to {
           transform: translateX(0);
           opacity: 1;
       }
   }
   
   @keyframes slideOutRight {
       from {
           transform: translateX(0);
           opacity: 1;
       }
       to {
           transform: translateX(400px);
           opacity: 0;
       }
   }
`;
document.head.appendChild(authStyles);

// ==================== UPDATE USER DISPLAY ====================
function updateUserDisplay() {
   const user = getLoggedInUser();
   const userBtn = document.getElementById('userBtn');
   
   if (user && userBtn) {
       // Update user button to show logged-in state
       userBtn.innerHTML = `
           <div style="display: flex; align-items: center; gap: 0.5rem;">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                   <circle cx="12" cy="8" r="4" fill="currentColor"/>
                   <path d="M6 21C6 17.5 8.5 15 12 15C15.5 15 18 17.5 18 21" fill="currentColor"/>
               </svg>
               <span style="font-size: 0.9rem; font-weight: 600; display: none; color: var(--primary-green);" class="user-name-display">
                   ${user.name.split(' ')[0]}
               </span>
           </div>
       `;
       userBtn.title = `Logged in as ${user.name}`;
       
       // Show name on desktop
       if (window.innerWidth > 768) {
           const nameDisplay = userBtn.querySelector('.user-name-display');
           if (nameDisplay) nameDisplay.style.display = 'block';
       }
   }
}

// ==================== PROTECT PAGES ====================
function requireLogin(redirectUrl = 'login.html') {
   if (!isUserLoggedIn()) {
       // Save the intended destination
       sessionStorage.setItem('redirect_after_login', window.location.href);
       // Redirect to login
       window.location.href = redirectUrl;
       return false;
   }
   return true;
}

// ==================== EXPORT FUNCTIONS ====================
window.authModule = {
   register: registerUser,
   login: loginUser,
   logout: logoutUser,
   isLoggedIn: isUserLoggedIn,
   getCurrentUser: getLoggedInUser,
   getCurrentSession: getCurrentSession,
   updateDisplay: updateUserDisplay,
   requireLogin: requireLogin,
   showSuccess: showSuccessMessage,
   showError: showErrorMessage
};

// Auto-update user display on page load
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', updateUserDisplay);
} else {
   updateUserDisplay();
}

console.log('🔐 Authentication module loaded successfully');