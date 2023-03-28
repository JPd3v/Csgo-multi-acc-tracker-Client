interface Idrop {
  _id: string;
  name: string;
  user_id: string;
  steam_account_id: string;
  quality: string;
  price: number;
  creation_date: string;
}

type IcreateDrop = Pick<
  Idrop,
  'name' | 'price' | 'quality' | 'steam_account_id'
>;

export type { Idrop, IcreateDrop };
