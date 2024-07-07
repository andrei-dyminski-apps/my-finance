type BudgetAccounts = { id: number }[];

type CategoryAccounts = { id: number }[];

export interface BudgetItemData {
  name: string;
  amount: number;
  period: string;
  accounts: BudgetAccounts;
  categories: CategoryAccounts;
}

export interface BudgetItem {
  id: number;
  name: string;
  amount: number;
  period: string;
  accounts: BudgetAccounts;
  categories: CategoryAccounts;
  created_at?: string;
}
