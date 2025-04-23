import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { IOrder, IOrderItem } from '../interfaces/order.interface';
import { generateOrderNumber } from '../utils/helpers';

// Interface cho Order Creation
interface OrderCreationAttributes extends Optional<IOrder, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber' | 'orderItems'> {}

// Interface cho OrderItem Creation
interface OrderItemCreationAttributes extends Optional<IOrderItem, 'id' | 'productName' | 'productImage'> {}

// Order Model
class Order extends Model<IOrder, OrderCreationAttributes> implements IOrder {
  public id!: string;
  public userId!: string;
  public orderNumber!: string;
  public status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  public totalAmount!: number;
  public shippingAddress!: string;
  public paymentMethod!: 'cod' | 'digital';
  public paymentStatus!: 'pending' | 'paid' | 'failed';
  public orderItems?: OrderItem[];
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// OrderItem Model
class OrderItem extends Model<IOrderItem, OrderItemCreationAttributes> implements IOrderItem {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  public productName!: string;
  public productImage?: string;
}

// Khởi tạo Order Model
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('cod', 'digital'),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    hooks: {
      beforeCreate: (order: Order) => {
        // Tạo mã đơn hàng tự động
        order.orderNumber = generateOrderNumber();
      },
    },
  }
);

// Khởi tạo OrderItem Model
OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
    hooks: {
      beforeCreate: async (orderItem: OrderItem) => {
        // Lấy thông tin sản phẩm hiện tại
        const Product = sequelize.models.Product;
        if (Product) {
          const product = await Product.findByPk(orderItem.productId);
          if (product) {
            orderItem.productName = product.getDataValue('name');
            const images = product.getDataValue('images');
            if (images && images.length > 0) {
              orderItem.productImage = images[0];
            }
          }
        }
      },
    },
  }
);

// Thiết lập các mối quan hệ
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'orderItems',
  onDelete: 'CASCADE',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

export { Order, OrderItem }; 