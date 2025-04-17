export interface IUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: 'user' | 'admin' | 'seller';
  isActive: boolean;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface IUserCreate {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  role?: 'user' | 'admin' | 'seller';
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  isActive?: boolean;
  role?: 'user' | 'admin' | 'seller';
}

export interface IUserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  role: string;
} 