import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTransactionStore } from '../store/useTransactionStore';

const SummaryCards: React.FC = () => {
  const { summary } = useTransactionStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Income',
      amount: summary?.totalIncome || 0,
      icon: ArrowUpCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Expense',
      amount: summary?.totalExpense || 0,
      icon: ArrowDownCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Net Balance',
      amount: summary?.balance || 0,
      icon: Wallet,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className={`${card.bgColor} p-3 rounded-lg`}>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.title}</p>
            <p className={`text-2xl font-bold ${card.title === 'Net Balance' && card.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatCurrency(card.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
