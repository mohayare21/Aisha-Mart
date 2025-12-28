-- ==================== AISHA MART DATABASE SCHEMA ====================
-- Database: aishamart_db
-- This schema supports full e-commerce functionality with user authentication,
-- product management, shopping cart, and order processing

-- ==================== CREATE DATABASE ====================
CREATE DATABASE IF NOT EXISTS aishamart_db;
USE aishamart_db;

-- ==================== USERS TABLE ====================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Store hashed passwords using bcrypt or similar
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- ==================== CATEGORIES TABLE ====================
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(10),  -- Emoji or icon identifier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_name (name)
);

-- ==================== PRODUCTS TABLE ====================
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    image_url VARCHAR(255),
    emoji VARCHAR(10),
    badge VARCHAR(50),  -- 'New', 'Sale', 'Trending', etc.
    rating DECIMAL(3, 2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_price (price),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at),
    
    CHECK (price >= 0),
    CHECK (stock_quantity >= 0),
    CHECK (rating >= 0 AND rating <= 5)
);

-- ==================== CART TABLE ====================
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    INDEX idx_user (user_id),
    
    CHECK (quantity > 0)
);

-- ==================== ORDERS TABLE ====================
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Shipping Information
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    notes TEXT,
    
    -- Order Details
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 5.00,
    tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    
    -- Payment & Status
    payment_method ENUM('cod', 'card', 'wallet') DEFAULT 'cod',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    
    -- Timestamps
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_order_date (order_date),
    INDEX idx_status (order_status),
    
    CHECK (subtotal >= 0),
    CHECK (total >= 0)
);

-- ==================== ORDER ITEMS TABLE ====================
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,  -- Store product name at time of order
    price DECIMAL(10, 2) NOT NULL,       -- Store price at time of order
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_order (order_id),
    
    CHECK (quantity > 0),
    CHECK (price >= 0),
    CHECK (subtotal >= 0)
);

-- ==================== PRODUCT REVIEWS TABLE ====================
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (product_id, user_id),
    INDEX idx_product (product_id),
    
    CHECK (rating >= 1 AND rating <= 5)
);

-- ==================== NEWSLETTER SUBSCRIBERS TABLE ====================
CREATE TABLE newsletter_subscribers (
    subscriber_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_email (email)
);

-- ==================== ADMIN ACTIVITY LOG TABLE ====================
CREATE TABLE admin_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_admin (admin_id),
    INDEX idx_created_at (created_at)
);

-- ==================== INSERT SAMPLE DATA ====================

-- Insert Categories
INSERT INTO categories (name, description, icon) VALUES
('groceries', 'Fresh produce and daily essentials', '🛒'),
('fashion', 'Trending styles for everyone', '👕'),
('electronics', 'Latest tech gadgets and accessories', '📱'),
('household', 'Everything for your home', '🏠');

-- Insert Sample Admin User
INSERT INTO users (name, email, password_hash, is_admin) VALUES
('Admin', 'admin@aishamart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE);
-- Note: This is a bcrypt hash of 'password123' - in production, use proper password hashing

-- Insert Sample Products
INSERT INTO products (name, description, category_id, price, stock_quantity, emoji, badge, rating, rating_count) VALUES
-- Groceries
('Fresh Organic Apples', 'Crisp and sweet organic apples, perfect for snacking', 1, 4.99, 100, '🍎', 'Organic', 4.8, 156),
('Whole Grain Bread', 'Freshly baked whole grain bread, high in fiber', 1, 3.49, 80, '🍞', NULL, 4.6, 89),
('Free Range Eggs', 'Farm fresh free-range eggs, dozen pack', 1, 5.99, 120, '🥚', 'Fresh', 4.9, 203),
('Premium Coffee Beans', 'Aromatic premium arabica coffee beans', 1, 12.99, 50, '☕', NULL, 4.7, 124),
('Fresh Vegetables Mix', 'Assorted fresh organic vegetables', 1, 7.99, 90, '🥬', 'Organic', 4.5, 92),
('Basmati Rice 5kg', 'Premium long grain basmati rice', 1, 15.99, 60, '🍚', NULL, 4.8, 178),

-- Fashion
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt, various colors', 2, 19.99, 200, '👕', NULL, 4.6, 234),
('Denim Jeans', 'Classic fit denim jeans, premium quality', 2, 49.99, 150, '👖', 'Trending', 4.7, 167),
('Summer Dress', 'Elegant floral summer dress', 2, 39.99, 100, '👗', NULL, 4.8, 145),
('Casual Sneakers', 'Comfortable casual sneakers for everyday wear', 2, 59.99, 80, '👟', 'Best Seller', 4.9, 312),
('Leather Handbag', 'Stylish genuine leather handbag', 2, 79.99, 50, '👜', NULL, 4.7, 98),
('Winter Jacket', 'Warm and stylish winter jacket', 2, 89.99, 70, '🧥', NULL, 4.8, 156),

-- Electronics
('Wireless Earbuds', 'Premium sound quality wireless earbuds', 3, 79.99, 120, '🎧', 'New', 4.6, 456),
('Smart Watch', 'Feature-rich smartwatch with health tracking', 3, 199.99, 60, '⌚', 'Trending', 4.8, 289),
('Portable Charger', 'High-capacity portable power bank', 3, 29.99, 150, '🔋', NULL, 4.7, 567),
('Bluetooth Speaker', 'Waterproof bluetooth speaker with deep bass', 3, 49.99, 100, '🔊', NULL, 4.5, 234),
('USB-C Cable', 'Durable fast-charging USB-C cable', 3, 12.99, 300, '🔌', NULL, 4.6, 890),
('Laptop Stand', 'Ergonomic adjustable laptop stand', 3, 34.99, 80, '💻', NULL, 4.8, 178),

-- Household
('Vacuum Cleaner', 'Powerful cordless vacuum cleaner', 4, 149.99, 40, '🧹', 'Best Seller', 4.7, 234),
('Bed Sheet Set', 'Soft cotton bed sheet set, queen size', 4, 39.99, 90, '🛏️', NULL, 4.8, 345),
('Kitchen Knife Set', 'Professional stainless steel knife set', 4, 69.99, 50, '🔪', NULL, 4.9, 167),
('Storage Containers', 'Airtight food storage container set', 4, 24.99, 120, '📦', NULL, 4.6, 289),
('LED Desk Lamp', 'Adjustable LED desk lamp with USB port', 4, 34.99, 100, '💡', NULL, 4.7, 456),
('Bathroom Towel Set', 'Soft absorbent towel set, 6 pieces', 4, 29.99, 80, '🧴', NULL, 4.8, 123);

-- ==================== USEFUL QUERIES ====================

-- Get all products with category name
-- SELECT p.*, c.name as category_name 
-- FROM products p 
-- JOIN categories c ON p.category_id = c.category_id 
-- WHERE p.is_active = TRUE;

-- Get user's cart with product details
-- SELECT c.cart_id, c.quantity, p.name, p.price, p.emoji, (c.quantity * p.price) as subtotal
-- FROM cart c
-- JOIN products p ON c.product_id = p.product_id
-- WHERE c.user_id = ?;

-- Get order details with items
-- SELECT o.*, oi.product_name, oi.quantity, oi.price, oi.subtotal
-- FROM orders o
-- JOIN order_items oi ON o.order_id = oi.order_id
-- WHERE o.user_id = ?
-- ORDER BY o.order_date DESC;

-- Update product rating after new review
-- UPDATE products 
-- SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = ?),
--     rating_count = (SELECT COUNT(*) FROM reviews WHERE product_id = ?)
-- WHERE product_id = ?;

-- Get sales statistics
-- SELECT 
--     DATE(order_date) as date,
--     COUNT(*) as order_count,
--     SUM(total) as total_sales
-- FROM orders
-- WHERE order_status != 'cancelled'
-- GROUP BY DATE(order_date)
-- ORDER BY date DESC;

-- ==================== STORED PROCEDURES ====================

DELIMITER //

-- Procedure to add item to cart
CREATE PROCEDURE add_to_cart(
    IN p_user_id INT,
    IN p_product_id INT,
    IN p_quantity INT
)
BEGIN
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (p_user_id, p_product_id, p_quantity)
    ON DUPLICATE KEY UPDATE 
        quantity = quantity + p_quantity,
        updated_at = CURRENT_TIMESTAMP;
END //

-- Procedure to place an order
CREATE PROCEDURE place_order(
    IN p_user_id INT,
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_address VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_postal_code VARCHAR(20),
    IN p_country VARCHAR(100),
    IN p_notes TEXT,
    IN p_payment_method VARCHAR(20)
)
BEGIN
    DECLARE v_order_id INT;
    DECLARE v_order_number VARCHAR(50);
    DECLARE v_subtotal DECIMAL(10, 2);
    DECLARE v_tax DECIMAL(10, 2);
    DECLARE v_total DECIMAL(10, 2);
    
    -- Calculate order totals
    SELECT SUM(c.quantity * p.price) INTO v_subtotal
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = p_user_id;
    
    SET v_tax = v_subtotal * 0.1;
    SET v_total = v_subtotal + 5.00 + v_tax;
    SET v_order_number = CONCAT('ORD-', UNIX_TIMESTAMP());
    
    -- Create order
    INSERT INTO orders (
        user_id, order_number, full_name, email, phone, address, 
        city, postal_code, country, notes, subtotal, tax, total, payment_method
    ) VALUES (
        p_user_id, v_order_number, p_full_name, p_email, p_phone, p_address,
        p_city, p_postal_code, p_country, p_notes, v_subtotal, v_tax, v_total, p_payment_method
    );
    
    SET v_order_id = LAST_INSERT_ID();
    
    -- Copy cart items to order items
    INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal)
    SELECT 
        v_order_id,
        p.product_id,
        p.name,
        p.price,
        c.quantity,
        c.quantity * p.price
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = p_user_id;
    
    -- Update product stock
    UPDATE products p
    JOIN cart c ON p.product_id = c.product_id
    SET p.stock_quantity = p.stock_quantity - c.quantity
    WHERE c.user_id = p_user_id;
    
    -- Clear cart
    DELETE FROM cart WHERE user_id = p_user_id;
    
    SELECT v_order_id as order_id, v_order_number as order_number;
END //

DELIMITER ;

-- ==================== VIEWS ====================

-- View for product catalog with category
CREATE VIEW product_catalog AS
SELECT 
    p.product_id,
    p.name,
    p.description,
    c.name as category,
    p.price,
    p.stock_quantity,
    p.emoji,
    p.badge,
    p.rating,
    p.rating_count,
    p.is_active
FROM products p
JOIN categories c ON p.category_id = c.category_id;

-- View for order summary
CREATE VIEW order_summary AS
SELECT 
    o.order_id,
    o.order_number,
    o.user_id,
    u.name as customer_name,
    o.total,
    o.order_status,
    o.order_date,
    COUNT(oi.order_item_id) as item_count
FROM orders o
JOIN users u ON o.user_id = u.user_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- ==================== SECURITY & PERFORMANCE ====================

-- Create indexes for better query performance
-- Already defined in table creation above

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON aishamart_db.* TO 'webapp_user'@'localhost';
-- GRANT ALL PRIVILEGES ON aishamart_db.* TO 'admin_user'@'localhost';

-- ==================== END OF SCHEMA ====================