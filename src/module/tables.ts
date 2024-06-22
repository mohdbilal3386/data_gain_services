export interface RowData {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  price: number;
  history: Array<{ date: string; customerId: string; amount: number }>;
}
