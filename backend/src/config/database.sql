-- Tạo cơ sở dữ liệu
CREATE DATABASE web;
GO

USE web;
GO

-- Tạo bảng người dùng
CREATE TABLE users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    fullName NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL DEFAULT 'user',
    isActive BIT NOT NULL DEFAULT 1,
    phoneNumber NVARCHAR(20),
    address NVARCHAR(500),
    avatarUrl NVARCHAR(500),
    lastLogin DATETIME,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Tạo bảng danh mục sản phẩm
CREATE TABLE categories (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(1000),
    slug NVARCHAR(255) NOT NULL UNIQUE,
    parentId UNIQUEIDENTIFIER NULL,
    isActive BIT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Categories_ParentCategory FOREIGN KEY (parentId) REFERENCES categories(id)
);
GO

-- Tạo bảng sản phẩm
CREATE TABLE products (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(18, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    images NVARCHAR(MAX),
    rating DECIMAL(3, 2) DEFAULT 0,
    reviewCount INT DEFAULT 0,
    isActive BIT NOT NULL DEFAULT 1,
    slug NVARCHAR(255) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Tạo bảng liên kết sản phẩm và danh mục
CREATE TABLE product_categories (
    productId UNIQUEIDENTIFIER NOT NULL,
    categoryId UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (productId, categoryId),
    CONSTRAINT FK_ProductCategories_Product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProductCategories_Category FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);
GO

-- Tạo bảng đánh giá sản phẩm
CREATE TABLE product_reviews (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    productId UNIQUEIDENTIFIER NOT NULL,
    userId UNIQUEIDENTIFIER NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(1000),
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_ProductReviews_Product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProductReviews_User FOREIGN KEY (userId) REFERENCES users(id)
);
GO

-- Tạo bảng đơn hàng
CREATE TABLE orders (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UNIQUEIDENTIFIER NOT NULL,
    orderNumber NVARCHAR(50) NOT NULL UNIQUE,
    status NVARCHAR(50) NOT NULL DEFAULT 'pending',
    totalAmount DECIMAL(18, 2) NOT NULL,
    shippingAddress NVARCHAR(500) NOT NULL,
    paymentMethod NVARCHAR(50) NOT NULL,
    paymentStatus NVARCHAR(50) NOT NULL DEFAULT 'pending',
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Orders_User FOREIGN KEY (userId) REFERENCES users(id)
);
GO

-- Tạo bảng chi tiết đơn hàng
CREATE TABLE order_items (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    orderId UNIQUEIDENTIFIER NOT NULL,
    productId UNIQUEIDENTIFIER NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    productName NVARCHAR(255) NOT NULL,
    productImage NVARCHAR(500),
    CONSTRAINT FK_OrderItems_Order FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Product FOREIGN KEY (productId) REFERENCES products(id)
);
GO

-- Tạo bảng giỏ hàng
CREATE TABLE cart (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UNIQUEIDENTIFIER NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Cart_User FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
GO

-- Tạo bảng chi tiết giỏ hàng
CREATE TABLE cart_items (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    cartId UNIQUEIDENTIFIER NOT NULL,
    productId UNIQUEIDENTIFIER NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_CartItems_Cart FOREIGN KEY (cartId) REFERENCES cart(id) ON DELETE CASCADE,
    CONSTRAINT FK_CartItems_Product FOREIGN KEY (productId) REFERENCES products(id),
    CONSTRAINT UQ_CartItem_Product UNIQUE (cartId, productId)
);
GO

-- Tạo Stored Procedure để tính tổng số tiền của đơn hàng
CREATE PROCEDURE CalculateOrderTotal
    @OrderId UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @Total DECIMAL(18, 2);
    
    SELECT @Total = SUM(quantity * price)
    FROM order_items
    WHERE orderId = @OrderId;
    
    UPDATE orders
    SET totalAmount = @Total
    WHERE id = @OrderId;
END;
GO

-- Tạo Trigger để cập nhật số lượng hàng trong kho khi đơn hàng được tạo
CREATE TRIGGER TR_OrderItems_AfterInsert
ON order_items
AFTER INSERT
AS
BEGIN
    UPDATE p
    SET p.stock = p.stock - i.quantity
    FROM products p
    INNER JOIN inserted i ON p.id = i.productId;
END;
GO

-- Tạo Trigger để cập nhật rating trung bình của sản phẩm khi có đánh giá mới
CREATE TRIGGER TR_ProductReviews_AfterInsertUpdate
ON product_reviews
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE p
    SET p.rating = r.avg_rating,
        p.reviewCount = r.review_count
    FROM products p
    INNER JOIN (
        SELECT productId, AVG(CAST(rating AS DECIMAL(3,2))) AS avg_rating, COUNT(*) AS review_count
        FROM product_reviews
        GROUP BY productId
    ) r ON p.id = r.productId
    WHERE EXISTS (
        SELECT 1 FROM inserted i WHERE i.productId = p.id
    );
END;
GO 