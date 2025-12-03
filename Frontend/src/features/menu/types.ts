export type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  available: boolean;
  ingredients?: string[];
  customizable: boolean;
};