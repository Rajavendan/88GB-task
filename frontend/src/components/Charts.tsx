import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useTransactionStore } from '../store/useTransactionStore';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Charts: React.FC = () => {
  const { summary } = useTransactionStore();

  const categoryLabels = Object.keys(summary?.categoryExpenses || {});
  const categoryValues = Object.values(summary?.categoryExpenses || {});

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Expense by Category',
        data: categoryValues,
        backgroundColor: [
          '#0ea5e9', '#ef4444', '#10b981', '#f59e0b', '#6366f1',
          '#ec4899', '#8b5cf6', '#f97316', '#06b6d4', '#14b8a6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Expense Amount (₹)',
        data: categoryValues,
        backgroundColor: '#0ea5e9',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (!categoryLabels.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center h-80">
          <p className="text-gray-400">No expense data for charts</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center h-80">
          <p className="text-gray-400">No expense data for charts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Expense Distribution</h3>
        <div className="h-64">
          <Pie data={pieData} options={options} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Category Comparison</h3>
        <div className="h-64">
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
