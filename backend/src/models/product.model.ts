import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { IProduct } from '../interfaces/product.interface';
import { slugify } from '../utils/helpers';

// Interface cho các thuộc tính có thể tạo (không bắt buộc có ID vì sẽ được tạo tự động)
interface ProductCreationAttributes extends Optional<IProduct, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'isActive' | 'slug'> {}

class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public categories!: string[];
  public images!: string[];
  public rating!: number;
  public reviewCount!: number;
  public isActive!: boolean;
  public slug!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0,
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: 'Product',
    tableName: 'products',
    hooks: {
      beforeCreate: (product: Product) => {
        product.slug = slugify(product.name);
      },
      beforeUpdate: (product: Product) => {
        if (product.changed('name')) {
          product.slug = slugify(product.name);
        }
      },
    },
  }
);

export default Product; 