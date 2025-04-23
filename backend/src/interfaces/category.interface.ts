export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  parentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreate {
  name: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  parentId?: string | null;
}

export interface ICategoryUpdate {
  name?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  parentId?: string | null;
}

export interface ICategoryWithSubcategories extends ICategory {
  subcategories?: ICategory[];
} 