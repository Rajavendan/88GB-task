import React, { useEffect, useState } from 'react';
import { PlusCircle, Filter, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useTransactionStore, Transaction } from '../store/useTransactionStore';

const DashboardPage: React.FC = () => {
  const { fetchTransactions, fetchSummary } = useTransactionStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, [fetchTransactions, fetchSummary]);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Financial Dashboard</h1>
            <p className="text-gray-500 mt-1">Track your income and expenses at a glance.</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        <SummaryCards />
        
        <Charts />
        
        <TransactionList onEdit={handleEdit} />

        <TransactionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          transaction={editingTransaction}
        />
      </main>
    </div>
  );
};

export default DashboardPage;
