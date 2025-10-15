export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  quantity: number;
  image?: string;
};

export type CategoryMap = Record<string, Record<string, InventoryItem[]>>;
