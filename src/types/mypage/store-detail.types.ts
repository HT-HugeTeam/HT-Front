export interface StoreDetail {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeDescription: string;
  storeMenu: string[];
  storeNaverMap?: string;
}
export interface StoreFormData {
  storeName: string;
  storeAddress: string;
  storeDescription: string;
  storeMenu: string[];
  storeNaverMap?: string;
}
