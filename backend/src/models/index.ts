import User from './user.model';
// Khi tạo model, import và xuất chúng ở đây
// import Product from './product.model';
// import Order from './order.model';
// import OrderItem from './orderItem.model';

// Thiết lập các mối quan hệ giữa các mô hình
// Ví dụ:
// User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
// Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
// OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
// OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
// Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });

export {
  User,
  // Xuất các model khác ở đây
  // Product,
  // Order,
  // OrderItem,
}; 