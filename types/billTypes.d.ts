export interface BillType {
  _id?: string;
  date?: string | null;
  expenses?: ExpenseType[];
  user?: string;
  salary?: number | any;
  totalExpenses?: number;
  budgetRuleBreakdown?: Array<{
    category: string;
    percentage: number;
  }>;
  totalBills?: number;
  totalSaved?: number;
  status?: BillStatus;
}

export enum BillStatus {
  Active = "Active",
  Settle = "Settle",
}
