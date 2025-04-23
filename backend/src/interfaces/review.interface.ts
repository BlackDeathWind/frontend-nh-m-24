export interface IReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewCreate {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface IReviewUpdate {
  rating?: number;
  comment?: string;
  images?: string[];
  isVerified?: boolean;
}

export interface IReviewWithUser extends IReview {
  user: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
} 