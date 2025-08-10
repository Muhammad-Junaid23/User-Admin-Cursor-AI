export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type CategoryMap = Record<string, Record<string, InventoryItem[]>>;
