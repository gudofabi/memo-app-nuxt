export interface ExpenseType {
  _id?: string;
  amount?: number | null | any;
  description?: string;
  paid: boolean | false;
  category?: string;
}
