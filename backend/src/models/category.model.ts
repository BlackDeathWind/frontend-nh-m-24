import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { ICategory } from '../interfaces/category.interface';
import { slugify } from '../utils/helpers';

// Interface cho các thuộc tính có thể tạo (không bắt buộc có ID vì sẽ được tạo tự động)
interface CategoryCreationAttributes extends Optional<ICategory, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'slug'> {}

class Category extends Model<ICategory, CategoryCreationAttributes> implements ICategory {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public image?: string;
  public isActive!: boolean;
  public parentId?: string | null;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
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
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
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
    modelName: 'Category',
    tableName: 'categories',
    hooks: {
      beforeCreate: (category: Category) => {
        category.slug = slugify(category.name);
      },
      beforeUpdate: (category: Category) => {
        if (category.changed('name')) {
          category.slug = slugify(category.name);
        }
      },
    },
  }
);

// Tạo quan hệ đệ quy cho danh mục cha-con
Category.hasMany(Category, {
  as: 'subcategories',
  foreignKey: 'parentId',
});
Category.belongsTo(Category, {
  as: 'parent',
  foreignKey: 'parentId',
});

export default Category; 