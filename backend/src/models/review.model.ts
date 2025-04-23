import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { IReview } from '../interfaces/review.interface';

// Interface cho các thuộc tính có thể tạo (không bắt buộc có ID vì sẽ được tạo tự động)
interface ReviewCreationAttributes extends Optional<IReview, 'id' | 'createdAt' | 'updatedAt' | 'isVerified' | 'images'> {}

class Review extends Model<IReview, ReviewCreationAttributes> implements IReview {
  public id!: string;
  public productId!: string;
  public userId!: string;
  public rating!: number;
  public comment!: string;
  public images?: string[];
  public isVerified!: boolean;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Review',
    tableName: 'reviews',
    hooks: {
      afterCreate: async (review: Review) => {
        // Cập nhật rating trung bình và số lượng đánh giá của sản phẩm
        const Product = sequelize.models.Product;
        if (Product) {
          const productId = review.productId;
          const reviews = await Review.findAll({
            where: { productId },
          });
          
          const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
          const avgRating = parseFloat((totalRating / reviews.length).toFixed(2));
          
          await Product.update(
            {
              rating: avgRating,
              reviewCount: reviews.length,
            },
            {
              where: { id: productId },
            }
          );
        }
      },
      afterDestroy: async (review: Review) => {
        // Cập nhật rating trung bình và số lượng đánh giá của sản phẩm khi xóa đánh giá
        const Product = sequelize.models.Product;
        if (Product) {
          const productId = review.productId;
          const reviews = await Review.findAll({
            where: { productId },
          });
          
          let avgRating = 0;
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
            avgRating = parseFloat((totalRating / reviews.length).toFixed(2));
          }
          
          await Product.update(
            {
              rating: avgRating,
              reviewCount: reviews.length,
            },
            {
              where: { id: productId },
            }
          );
        }
      },
    },
  }
);

export default Review; 