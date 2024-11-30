export interface IncomeEntry {
  id: string;
  amount: number;
  description: string;
  date: string;
}

export interface IncomeState {
  visa: IncomeEntry[];
  cash: IncomeEntry[];
}

export interface DailyHistory {
  date: string;
  visa: IncomeEntry[];
  cash: IncomeEntry[];
  visaTotal: number;
  cashTotal: number;
  totalIncome: number;
  netBenefit: number;
  difference: number;
}