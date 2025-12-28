// ==================== FEATURED PRODUCTS DATA (8 ITEMS) ====================
const featuredProductsData = [
   {
       id: 101,
       name: "Premium Basmati Rice (5kg)",
       category: "groceries",
       price: 1299,
       originalPrice: 1600,
       rating: 4.8,
       ratingCount: 245,
       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Premium long grain basmati rice, perfect for biryanis and everyday meals"
   },
   {
       id: 102,
       name: "Smart Fitness Watch",
       category: "electronics",
       price: 2999,
       originalPrice: 3800,
       rating: 4.6,
       ratingCount: 189,
       image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Track your fitness goals with heart rate monitor, step counter, and sleep tracking"
   },
   {
       id: 103,
       name: "Wireless Bluetooth Earbuds",
       category: "electronics",
       price: 1499,
       originalPrice: 2100,
       rating: 4.7,
       ratingCount: 312,
       image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Crystal clear sound with noise cancellation and 20-hour battery life"
   },
   {
       id: 104,
       name: "Electric Kettle (1.8L)",
       category: "household",
       price: 2199,
       originalPrice: 2800,
       rating: 4.5,
       ratingCount: 156,
       image: "https://images.unsplash.com/photo-1563822249548-9a72b6d466fc?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Fast boiling electric kettle with auto shut-off and temperature control"
   },
   {
       id: 105,
       name: "Organic Cooking Oil (3L)",
       category: "groceries",
       price: 1799,
       originalPrice: 2300,
       rating: 4.8,
       ratingCount: 203,
       image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "100% pure organic cooking oil, rich in vitamins and perfect for healthy cooking"
   },
   {
       id: 106,
       name: "Men's Casual Sneakers",
       category: "fashion",
       price: 2499,
       originalPrice: 3200,
       rating: 4.9,
       ratingCount: 278,
       image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Comfortable and stylish sneakers perfect for everyday wear"
   },
   {
       id: 107,
       name: "Ladies Handbag (Leather-style)",
       category: "fashion",
       price: 1899,
       originalPrice: 2500,
       rating: 4.7,
       ratingCount: 167,
       image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "Elegant leather-style handbag with multiple compartments"
   },
   {
       id: 108,
       name: "Portable Blender",
       category: "household",
       price: 1699,
       originalPrice: 2200,
       rating: 4.6,
       ratingCount: 194,
       image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
       badge: "Limited Time Offer",
       description: "USB rechargeable portable blender for smoothies on the go"
   }
];

// ==================== PRODUCTS DATA ====================
const productsDatabase = [
   // Groceries
   {
       id: 1,
       name: "Fresh Organic Apples",
       category: "groceries",
       price: 499,
       originalPrice: 699,
       rating: 4.8,
       ratingCount: 156,
       image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
       emoji: "🍎",
       badge: "Organic",
       description: "Crisp and sweet organic apples, perfect for snacking"
   },
   {
       id: 2,
       name: "Whole Grain Bread",
       category: "groceries",
       price: 120,
       rating: 4.6,
       ratingCount: 89,
       image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
       emoji: "🍞",
       description: "Freshly baked whole grain bread, high in fiber"
   },
   {
       id: 3,
       name: "Free Range Eggs (1 Dozen)",
       category: "groceries",
       price: 350,
       rating: 4.9,
       ratingCount: 203,
       image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
       emoji: "🥚",
       badge: "Fresh",
       description: "Farm fresh free-range eggs, dozen pack"
   },
   {
       id: 4,
       name: "Premium Coffee Beans 500g",
       category: "groceries",
       price: 1299,
       originalPrice: 1599,
       rating: 4.7,
       ratingCount: 124,
       image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
       emoji: "☕",
       badge: "-20%",
       description: "Aromatic premium arabica coffee beans"
   },
   {
       id: 5,
       name: "Fresh Vegetables Mix",
       category: "groceries",
       price: 450,
       rating: 4.5,
       ratingCount: 92,
       image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
       emoji: "🥬",
       badge: "Organic",
       description: "Assorted fresh organic vegetables"
   },
   {
       id: 6,
       name: "Basmati Rice 5kg",
       category: "groceries",
       price: 1250,
       rating: 4.8,
       ratingCount: 178,
       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
       emoji: "🍚",
       description: "Premium long grain basmati rice"
   },
   
   // Fashion
   {
       id: 7,
       name: "Cotton T-Shirt",
       category: "fashion",
       price: 899,
       originalPrice: 1299,
       rating: 4.6,
       ratingCount: 234,
       image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
       emoji: "👕",
       badge: "-30%",
       description: "Comfortable 100% cotton t-shirt, various colors"
   },
   {
       id: 8,
       name: "Denim Jeans",
       category: "fashion",
       price: 2499,
       rating: 4.7,
       ratingCount: 167,
       image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
       emoji: "👖",
       badge: "Trending",
       description: "Classic fit denim jeans, premium quality"
   },
   {
       id: 9,
       name: "Summer Dress",
       category: "fashion",
       price: 1999,
       rating: 4.8,
       ratingCount: 145,
       image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
       emoji: "👗",
       description: "Elegant floral summer dress"
   },
   {
       id: 10,
       name: "Casual Sneakers",
       category: "fashion",
       price: 3499,
       originalPrice: 4999,
       rating: 4.9,
       ratingCount: 312,
       image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
       emoji: "👟",
       badge: "Best Seller",
       description: "Comfortable casual sneakers for everyday wear"
   },
   {
       id: 11,
       name: "Leather Handbag",
       category: "fashion",
       price: 4999,
       rating: 4.7,
       ratingCount: 98,
       image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
       emoji: "👜",
       description: "Stylish genuine leather handbag"
   },
   {
       id: 12,
       name: "Winter Jacket",
       category: "fashion",
       price: 5499,
       rating: 4.8,
       ratingCount: 156,
       image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
       emoji: "🧥",
       description: "Warm and stylish winter jacket"
   },
   
   // Electronics
   {
       id: 13,
       name: "Wireless Earbuds",
       category: "electronics",
       price: 3999,
       originalPrice: 5999,
       rating: 4.6,
       ratingCount: 456,
       image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
       emoji: "🎧",
       badge: "New",
       description: "Premium sound quality wireless earbuds"
   },
   {
       id: 14,
       name: "Smart Watch",
       category: "electronics",
       price: 12999,
       rating: 4.8,
       ratingCount: 289,
       image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
       emoji: "⌚",
       badge: "Trending",
       description: "Feature-rich smartwatch with health tracking"
   },
   {
       id: 15,
       name: "Portable Charger 20000mAh",
       category: "electronics",
       price: 1999,
       rating: 4.7,
       ratingCount: 567,
       image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
       emoji: "🔋",
       description: "High-capacity portable power bank"
   },
   {
       id: 16,
       name: "Bluetooth Speaker",
       category: "electronics",
       price: 2999,
       rating: 4.5,
       ratingCount: 234,
       image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
       emoji: "🔊",
       description: "Waterproof bluetooth speaker with deep bass"
   },
   {
       id: 17,
       name: "USB-C Cable (2m)",
       category: "electronics",
       price: 499,
       rating: 4.6,
       ratingCount: 890,
       image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
       emoji: "🔌",
       description: "Durable fast-charging USB-C cable"
   },
   {
       id: 18,
       name: "Laptop Stand",
       category: "electronics",
       price: 1799,
       rating: 4.8,
       ratingCount: 178,
       image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
       emoji: "💻",
       description: "Ergonomic adjustable laptop stand"
   },
   
   // Household
   {
       id: 19,
       name: "Vacuum Cleaner",
       category: "household",
       price: 8999,
       originalPrice: 12999,
       rating: 4.7,
       ratingCount: 234,
       image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
       emoji: "🧹",
       badge: "Best Seller",
       description: "Powerful cordless vacuum cleaner"
   },
   {
       id: 20,
       name: "Bed Sheet Set (Queen)",
       category: "household",
       price: 2499,
       rating: 4.8,
       ratingCount: 345,
       image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
       emoji: "🛏️",
       description: "Soft cotton bed sheet set, queen size"
   },
   {
       id: 21,
       name: "Kitchen Knife Set (6 pcs)",
       category: "household",
       price: 3999,
       rating: 4.9,
       ratingCount: 167,
       image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
       emoji: "🔪",
       description: "Professional stainless steel knife set"
   },
   {
       id: 22,
       name: "Storage Containers (10 pcs)",
       category: "household",
       price: 1499,
       rating: 4.6,
       ratingCount: 289,
       image: "https://images.unsplash.com/photo-1584269600519-112e9037f706?w=400&h=400&fit=crop",
       emoji: "📦",
       description: "Airtight food storage container set"
   },
   {
       id: 23,
       name: "LED Desk Lamp",
       category: "household",
       price: 1999,
       rating: 4.7,
       ratingCount: 456,
       image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
       emoji: "💡",
       description: "Adjustable LED desk lamp with USB port"
   },
   {
       id: 24,
       name: "Bathroom Towel Set (6 pcs)",
       category: "household",
       price: 1799,
       rating: 4.8,
       ratingCount: 123,
       image: "https://images.unsplash.com/photo-1620945867171-0b43c49e1bc0?w=400&h=400&fit=crop",
       emoji: "🧴",
       description: "Soft absorbent towel set, 6 pieces"
   }
];

// ==================== PRODUCT RENDERING ====================
function createProductCard(product) {
   const discountPercent = product.originalPrice 
       ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
       : 0;
   
   return `
       <div class="product-card" data-id="${product.id}">
           <div class="product-image">
               ${product.badge && !product.originalPrice ? `<span class="product-badge">${product.badge}</span>` : ''}
               ${discountPercent > 0 ? `<span class="product-badge product-badge-discount">-${discountPercent}%</span>` : ''}
               <img src="${product.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2260%22%3E' + product.emoji + '%3C/text%3E%3C/svg%3E'}" 
                    alt="${product.name}" 
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2260%22%3E${product.emoji}%3C/text%3E%3C/svg%3E'">
           </div>
           <div class="product-info">
               <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
               <h3 class="product-name">${product.name}</h3>
               <div class="product-rating">
                   ${generateStars(product.rating)}
                   <span class="rating-count">(${product.ratingCount})</span>
               </div>
               <div class="product-footer">
                   <div class="product-price-wrapper">
                       ${product.originalPrice ? `<span class="product-price-original">KSh ${product.originalPrice.toLocaleString()}</span>` : ''}
                       <span class="product-price">KSh ${product.price.toLocaleString()}</span>
                   </div>
                   <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
                           <path d="M9 2L7 5H3C2.45 5 2 5.45 2 6V19C2 19.55 2.45 20 3 20H21C21.55 20 22 19.55 22 19V6C22 5.45 21.55 5 21 5H17L15 2H9Z" stroke="currentColor" stroke-width="2" fill="none"/>
                       </svg>
                       Add to Cart
                   </button>
               </div>
           </div>
       </div>
   `;
}

function generateStars(rating) {
   const fullStars = Math.floor(rating);
   const hasHalfStar = rating % 1 >= 0.5;
   let stars = '';
   
   for (let i = 0; i < fullStars; i++) {
       stars += '<span class="star">★</span>';
   }
   
   if (hasHalfStar) {
       stars += '<span class="star">★</span>';
   }
   
   const emptyStars = 5 - Math.ceil(rating);
   for (let i = 0; i < emptyStars; i++) {
       stars += '<span class="star" style="color: #ddd;">★</span>';
   }
   
   return stars;
}

// ==================== FEATURED PRODUCTS ====================
function loadFeaturedProducts() {
   const container = document.getElementById('featuredProducts');
   if (!container) return;
   
   // Use the specific 8 featured products
   container.innerHTML = featuredProductsData.map(product => createProductCard(product)).join('');
}

// ==================== FILTER & SEARCH ====================
function filterProducts(filters = {}) {
   let filtered = [...productsDatabase];
   
   // Filter by category
   if (filters.category) {
       filtered = filtered.filter(p => p.category === filters.category);
   }
   
   // Filter by search query
   if (filters.search) {
       const query = filters.search.toLowerCase();
       filtered = filtered.filter(p => 
           p.name.toLowerCase().includes(query) ||
           p.category.toLowerCase().includes(query) ||
           p.description.toLowerCase().includes(query)
       );
   }
   
   // Filter by price range
   if (filters.minPrice !== undefined) {
       filtered = filtered.filter(p => p.price >= filters.minPrice);
   }
   if (filters.maxPrice !== undefined) {
       filtered = filtered.filter(p => p.price <= filters.maxPrice);
   }
   
   // Sort
   if (filters.sort) {
       switch (filters.sort) {
           case 'price-asc':
               filtered.sort((a, b) => a.price - b.price);
               break;
           case 'price-desc':
               filtered.sort((a, b) => b.price - a.price);
               break;
           case 'rating':
               filtered.sort((a, b) => b.rating - a.rating);
               break;
           case 'popular':
               filtered.sort((a, b) => b.ratingCount - a.ratingCount);
               break;
       }
   }
   
   return filtered;
}

function loadAllProducts(filters = {}) {
   const container = document.getElementById('allProducts');
   if (!container) return;
   
   const products = filterProducts(filters);
   
   if (products.length === 0) {
       container.innerHTML = `
           <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
               <h3>No products found</h3>
               <p style="color: var(--text-gray); margin-top: 1rem;">Try adjusting your filters</p>
           </div>
       `;
       return;
   }
   
   container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// ==================== URL PARAMETERS ====================
function getUrlParams() {
   const params = new URLSearchParams(window.location.search);
   return {
       category: params.get('category'),
       search: params.get('search'),
       sort: params.get('sort'),
       minPrice: params.get('minPrice') ? parseFloat(params.get('minPrice')) : undefined,
       maxPrice: params.get('maxPrice') ? parseFloat(params.get('maxPrice')) : undefined
   };
}

// ==================== INITIALIZATION ====================
function initProducts() {
   // Load featured products on homepage
   loadFeaturedProducts();
   
   // Load all products on products page
   const urlParams = getUrlParams();
   loadAllProducts(urlParams);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initProducts);
} else {
   initProducts();
}

// Export for use in other scripts
window.productsDatabase = productsDatabase;
window.filterProducts = filterProducts;
window.loadAllProducts = loadAllProducts;