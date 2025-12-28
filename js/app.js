// ==================== APPLICATION STATE ====================
const appState = {
   cart: JSON.parse(localStorage.getItem('aishamart_cart')) || [],
   user: JSON.parse(localStorage.getItem('aishamart_user')) || null,
   currentPage: 1,
   productsPerPage: 12
};

// ==================== DOM ELEMENTS ====================
const elements = {
   cartBtn: document.getElementById('cartBtn'),
   cartSidebar: document.getElementById('cartSidebar'),
   closeCart: document.getElementById('closeCart'),
   overlay: document.getElementById('overlay'),
   cartItems: document.getElementById('cartItems'),
   cartTotal: document.getElementById('cartTotal'),
   cartCount: document.getElementById('cartCount'),
   userBtn: document.getElementById('userBtn'),
   searchInput: document.getElementById('searchInput'),
   newsletterForm: document.getElementById('newsletterForm'),
   mobileMenuBtn: document.getElementById('mobileMenuBtn')
};

// ==================== CART FUNCTIONS ====================
function addToCart(product) {
   const existingItem = appState.cart.find(item => item.id === product.id);
   
   if (existingItem) {
       existingItem.quantity += 1;
   } else {
       appState.cart.push({
           ...product,
           quantity: 1
       });
   }
   
   saveCart();
   updateCartUI();
   showNotification('Product added to cart!', 'success');
}

function removeFromCart(productId) {
   appState.cart = appState.cart.filter(item => item.id !== productId);
   saveCart();
   updateCartUI();
   showNotification('Product removed from cart', 'info');
}

function updateQuantity(productId, change) {
   const item = appState.cart.find(item => item.id === productId);
   
   if (item) {
       item.quantity += change;
       
       if (item.quantity <= 0) {
           removeFromCart(productId);
       } else {
           saveCart();
           updateCartUI();
       }
   }
}

function saveCart() {
   localStorage.setItem('aishamart_cart', JSON.stringify(appState.cart));
}

function calculateTotal() {
   return appState.cart.reduce((total, item) => {
       return total + (item.price * item.quantity);
   }, 0);
}

function updateCartUI() {
   // Update cart count
   const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
   if (elements.cartCount) {
       elements.cartCount.textContent = totalItems;
   }
   
   // Update cart items
   if (elements.cartItems) {
       if (appState.cart.length === 0) {
           elements.cartItems.innerHTML = `
               <div style="text-align: center; padding: 2rem;">
                   <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;">🛒</div>
                   <p style="color: var(--text-gray); margin-bottom: 1rem;">Your cart is empty</p>
                   <a href="products.html" class="btn btn-primary">Start Shopping</a>
               </div>
           `;
       } else {
           elements.cartItems.innerHTML = appState.cart.map(item => `
               <div class="cart-item" data-id="${item.id}">
                   <div class="cart-item-image">
                       <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22%3E' + (item.emoji || '📦') + '%3C/text%3E%3C/svg%3E'}" 
                            alt="${item.name}"
                            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22%3E${item.emoji || '📦'}%3C/text%3E%3C/svg%3E'">
                   </div>
                   <div class="cart-item-info">
                       <div class="cart-item-name">${item.name}</div>
                       <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
                       <div class="cart-item-quantity">
                           <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                           <span class="qty-display">${item.quantity}</span>
                           <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                           <button class="qty-btn qty-btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                   <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                               </svg>
                           </button>
                       </div>
                   </div>
               </div>
           `).join('');
       }
   }
   
   // Update totals
   const subtotal = calculateTotal();
   const delivery = subtotal > 0 ? 200 : 0;
   const total = subtotal + delivery;
   
   const cartSubtotal = document.getElementById('cartSubtotal');
   const cartDelivery = document.getElementById('cartDelivery');
   const cartTotal = document.getElementById('cartTotal');
   
   if (cartSubtotal) cartSubtotal.textContent = `KSh ${subtotal.toLocaleString()}`;
   if (cartDelivery) cartDelivery.textContent = `KSh ${delivery.toLocaleString()}`;
   if (cartTotal) cartTotal.textContent = `KSh ${total.toLocaleString()}`;
   
   // Also update if there's a legacy cart total element
   if (elements.cartTotal) {
       elements.cartTotal.textContent = `KSh ${total.toLocaleString()}`;
   }
}

// ==================== CART SIDEBAR ====================
function openCart() {
   if (elements.cartSidebar && elements.overlay) {
       elements.cartSidebar.classList.add('active');
       elements.overlay.classList.add('active');
       document.body.style.overflow = 'hidden';
   }
}

function closeCart() {
   if (elements.cartSidebar && elements.overlay) {
       elements.cartSidebar.classList.remove('active');
       elements.overlay.classList.remove('active');
       document.body.style.overflow = '';
   }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
   const notification = document.createElement('div');
   notification.className = `notification notification-${type}`;
   notification.textContent = message;
   notification.style.cssText = `
       position: fixed;
       top: 100px;
       right: 20px;
       background: ${type === 'success' ? '#43A047' : type === 'error' ? '#E53935' : '#1B5E20'};
       color: white;
       padding: 1rem 1.5rem;
       border-radius: 8px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
       z-index: 3000;
       animation: slideIn 0.3s ease-out;
       font-family: var(--font-body);
   `;
   
   document.body.appendChild(notification);
   
   setTimeout(() => {
       notification.style.animation = 'slideOut 0.3s ease-out';
       setTimeout(() => notification.remove(), 300);
   }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
   @keyframes slideIn {
       from {
           transform: translateX(400px);
           opacity: 0;
       }
       to {
           transform: translateX(0);
           opacity: 1;
       }
   }
   
   @keyframes slideOut {
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
document.head.appendChild(style);

// ==================== USER AUTHENTICATION ====================
function checkAuth() {
   // Check if auth module is loaded
   if (typeof authModule !== 'undefined') {
       const user = authModule.getCurrentUser();
       
       if (user && elements.userBtn) {
           // Update user button to show logged-in state with name
           elements.userBtn.innerHTML = `
               <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--light-green); border-radius: 20px; transition: all 0.3s;">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                       <circle cx="12" cy="8" r="4" fill="var(--primary-green)"/>
                       <path d="M6 21C6 17.5 8.5 15 12 15C15.5 15 18 17.5 18 21" fill="var(--primary-green)"/>
                   </svg>
                   <span style="font-size: 0.9rem; font-weight: 600; color: var(--primary-green);">
                       ${user.name.split(' ')[0]}
                   </span>
               </div>
           `;
           elements.userBtn.title = `Logged in as ${user.name}`;
           
           // Update click handler for logged-in state
           elements.userBtn.onclick = function() {
               if (confirm(`Logged in as ${user.name}\n\nWould you like to logout?`)) {
                   authModule.logout();
                   authModule.showSuccess('Logged out successfully');
                   setTimeout(() => {
                       window.location.reload();
                   }, 1000);
               }
           };
       }
   } else {
       // Fallback to old method if auth module not loaded
       if (appState.user && elements.userBtn) {
           elements.userBtn.innerHTML = `
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                   <circle cx="12" cy="8" r="4" fill="currentColor"/>
                   <path d="M6 21C6 17.5 8.5 15 12 15C15.5 15 18 17.5 18 21" fill="currentColor"/>
               </svg>
           `;
           elements.userBtn.title = appState.user.name;
       }
   }
}

function login(email, password) {
   // This would normally make an API call to your backend
   // For demo purposes, we'll use localStorage
   const users = JSON.parse(localStorage.getItem('aishamart_users')) || [];
   const user = users.find(u => u.email === email && u.password === password);
   
   if (user) {
       appState.user = { id: user.id, name: user.name, email: user.email };
       localStorage.setItem('aishamart_user', JSON.stringify(appState.user));
       return { success: true, user: appState.user };
   }
   
   return { success: false, message: 'Invalid credentials' };
}

function signup(name, email, password) {
   // This would normally make an API call to your backend
   const users = JSON.parse(localStorage.getItem('aishamart_users')) || [];
   
   // Check if user exists
   if (users.find(u => u.email === email)) {
       return { success: false, message: 'Email already registered' };
   }
   
   const newUser = {
       id: Date.now(),
       name,
       email,
       password // In production, this should be hashed on the backend
   };
   
   users.push(newUser);
   localStorage.setItem('aishamart_users', JSON.stringify(users));
   
   appState.user = { id: newUser.id, name: newUser.name, email: newUser.email };
   localStorage.setItem('aishamart_user', JSON.stringify(appState.user));
   
   return { success: true, user: appState.user };
}

function logout() {
   appState.user = null;
   localStorage.removeItem('aishamart_user');
   window.location.href = 'index.html';
}

// ==================== SEARCH FUNCTIONALITY ====================
function searchProducts(query) {
   window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}

// ==================== NEWSLETTER ====================
function subscribeNewsletter(email) {
   // This would normally make an API call to your backend
   const subscribers = JSON.parse(localStorage.getItem('aishamart_subscribers')) || [];
   
   if (subscribers.includes(email)) {
       showNotification('You are already subscribed!', 'info');
       return;
   }
   
   subscribers.push(email);
   localStorage.setItem('aishamart_subscribers', JSON.stringify(subscribers));
   showNotification('Thank you for subscribing!', 'success');
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
   // Cart button
   if (elements.cartBtn) {
       elements.cartBtn.addEventListener('click', openCart);
   }
   
   // Close cart
   if (elements.closeCart) {
       elements.closeCart.addEventListener('click', closeCart);
   }
   
   // Overlay
   if (elements.overlay) {
       elements.overlay.addEventListener('click', closeCart);
   }
   
   // User button
   if (elements.userBtn) {
       elements.userBtn.addEventListener('click', () => {
           // Check if auth module is available
           if (typeof authModule !== 'undefined') {
               if (authModule.isLoggedIn()) {
                   const user = authModule.getCurrentUser();
                   // Already handled in checkAuth
                   // Click handler is set there
               } else {
                   window.location.href = 'login.html';
               }
           } else {
               // Fallback to old method
               if (appState.user) {
                   const menu = confirm(`Logged in as ${appState.user.name}\n\nWould you like to logout?`);
                   if (menu) {
                       logout();
                   }
               } else {
                   window.location.href = 'login.html';
               }
           }
       });
   }
   
   // Search
   if (elements.searchInput) {
       elements.searchInput.addEventListener('keypress', (e) => {
           if (e.key === 'Enter' && elements.searchInput.value.trim()) {
               searchProducts(elements.searchInput.value.trim());
           }
       });
   }
   
   // Newsletter form
   if (elements.newsletterForm) {
       elements.newsletterForm.addEventListener('submit', (e) => {
           e.preventDefault();
           const email = e.target.querySelector('input[type="email"]').value;
           subscribeNewsletter(email);
           e.target.reset();
       });
   }
   
   // Category cards
   const categoryCards = document.querySelectorAll('.category-card');
   categoryCards.forEach(card => {
       card.addEventListener('click', () => {
           const category = card.dataset.category;
           window.location.href = `products.html?category=${category}`;
       });
   });
   
   // Mobile menu
   if (elements.mobileMenuBtn) {
       elements.mobileMenuBtn.addEventListener('click', () => {
           // Toggle mobile menu (would need additional implementation)
           showNotification('Mobile menu coming soon!', 'info');
       });
   }
}

// ==================== INITIALIZATION ====================
function init() {
   updateCartUI();
   checkAuth();
   initEventListeners();
   
   // Smooth scroll for anchor links
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
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', init);
} else {
   init();
}

// Export functions for use in other scripts
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.login = login;
window.signup = signup;
window.logout = logout;