export interface ICart {
  items: Array<ICartItem>;
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
