interface MockUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock user cho vai trò Admin
export const mockAdminUser: MockUser = {
  id: 'mock-user-id-123',
  email: 'admin@example.com',
  fullName: 'Admin User',
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock user cho vai trò Seller
export const mockSellerUser: MockUser = {
  id: 'mock-seller-id-456',
  email: 'seller@example.com',
  fullName: 'Seller Account',
  role: 'seller',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock user cho vai trò Customer
export const mockCustomerUser: MockUser = {
  id: 'mock-customer-id-789',
  email: 'customer@example.com',
  fullName: 'Customer Account',
  role: 'customer',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock tokens cho development
export const mockTokens = {
  adminToken: 'mock-jwt-token-for-admin-development',
  sellerToken: 'mock-jwt-token-for-seller-development',
  customerToken: 'mock-jwt-token-for-customer-development'
}; 