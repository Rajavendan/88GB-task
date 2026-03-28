import { create } from 'zustand';
import api from '../api/axiosConfig';

export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  txnDate: string;
  notes?: string;
}

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryExpenses: Record<string, number>;
}

interface TransactionState {
  transactions: Transaction[];
  summary: Summary | null;
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchSummary: () => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (id: number, transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  summary: null,
  isLoading: false,

  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/transactions/all');
      set({ transactions: response.data });
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSummary: async () => {
    try {
      const response = await api.get('/summary');
      set({ summary: response.data });
    } catch (error) {
      console.error('Failed to fetch summary', error);
    }
  },

  addTransaction: async (transaction) => {
    try {
      await api.post('/transactions', transaction);
      await get().fetchTransactions();
      await get().fetchSummary();
    } catch (error) {
      console.error('Failed to add transaction', error);
      throw error;
    }
  },

  updateTransaction: async (id, transaction) => {
    try {
      await api.put(`/transactions/${id}`, transaction);
      await get().fetchTransactions();
      await get().fetchSummary();
    } catch (error) {
      console.error('Failed to update transaction', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      await get().fetchTransactions();
      await get().fetchSummary();
    } catch (error) {
      console.error('Failed to delete transaction', error);
      throw error;
    }
  },
}));
