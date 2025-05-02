export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  rating: number;
  link: string;
}