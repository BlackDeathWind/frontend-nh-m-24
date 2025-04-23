import User from './user.model';
import Product from './product.model';
import Category from './category.model';
import Review from './review.model';
import { Cart, CartItem } from './cart.model';
import { Order, OrderItem } from './order.model';
// Khi tạo model, import và xuất chúng ở đây
// import Product from './product.model';
// import Order from './order.model';
// import OrderItem from './orderItem.model';

// Thiết lập các mối quan hệ giữa các mô hình

// User - Order
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Cart
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Review
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Product - Review
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Product - CartItem
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Product - OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Category và Product có mối quan hệ many-to-many thông qua categories array của Product

export {
  User,
  Product,
  Category,
  Review,
  Cart,
  CartItem,
  Order,
  OrderItem
  // Xuất các model khác ở đây
  // Product,
  // Order,
  // OrderItem,
}; 