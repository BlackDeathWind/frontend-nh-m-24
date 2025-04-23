import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { ICart, ICartItem } from '../interfaces/cart.interface';

// Interface cho Cart Creation
interface CartCreationAttributes extends Optional<ICart, 'id' | 'createdAt' | 'updatedAt' | 'cartItems'> {}

// Interface cho CartItem Creation
interface CartItemCreationAttributes extends Optional<ICartItem, 'id' | 'createdAt' | 'updatedAt'> {}

// Cart Model
class Cart extends Model<ICart, CartCreationAttributes> implements ICart {
  public id!: string;
  public userId!: string;
  public cartItems?: CartItem[];
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Phương thức để lấy tổng số lượng sản phẩm trong giỏ hàng
  public async getTotalItems(): Promise<number> {
    const items = await CartItem.findAll({
      where: { cartId: this.id }
    });
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Phương thức để lấy tổng giá trị giỏ hàng
  public async getTotalAmount(): Promise<number> {
    const items = await CartItem.findAll({
      where: { cartId: this.id }
    });
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

// CartItem Model
class CartItem extends Model<ICartItem, CartItemCreationAttributes> implements ICartItem {
  public id!: string;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Khởi tạo Cart Model
Cart.init(
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
    modelName: 'Cart',
    tableName: 'carts',
  }
);

// Khởi tạo CartItem Model
CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'carts',
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
    modelName: 'CartItem',
    tableName: 'cart_items',
    hooks: {
      beforeCreate: async (cartItem: CartItem) => {
        // Lấy giá sản phẩm hiện tại từ bảng products
        const Product = sequelize.models.Product;
        if (Product) {
          const product = await Product.findByPk(cartItem.productId);
          if (product) {
            cartItem.price = product.getDataValue('price');
          }
        }
      },
    },
  }
);

// Thiết lập các mối quan hệ
Cart.hasMany(CartItem, {
  foreignKey: 'cartId',
  as: 'cartItems',
  onDelete: 'CASCADE',
});

CartItem.belongsTo(Cart, {
  foreignKey: 'cartId',
  as: 'cart',
});

export { Cart, CartItem }; 