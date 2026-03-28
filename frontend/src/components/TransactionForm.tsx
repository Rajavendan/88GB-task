import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Plus, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTransactionStore, Transaction } from '../store/useTransactionStore';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const CATEGORIES = [
  'Food & Dining', 'Groceries', 'Rent', 'Utilities', 'Transportation',
  'Shopping', 'Health', 'Entertainment', 'Education', 'Investment',
  'Salary', 'Freelance', 'Gifts', 'Others'
];

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, transaction }) => {
  const { addTransaction, updateTransaction } = useTransactionStore();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<Transaction>();

  useEffect(() => {
    if (transaction) {
      setValue('title', transaction.title);
      setValue('amount', transaction.amount);
      setValue('type', transaction.type);
      setValue('category', transaction.category);
      setValue('txnDate', transaction.txnDate);
      setValue('notes', transaction.notes);
    } else {
      reset({
        title: '',
        amount: undefined,
        type: 'EXPENSE',
        category: 'Others',
        txnDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [transaction, setValue, reset]);

  const onSubmit = async (data: Transaction) => {
    try {
      if (transaction?.id) {
        await updateTransaction(transaction.id, data);
        toast.success('Transaction updated successfully');
      } else {
        await addTransaction(data);
        toast.success('Transaction added successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="What was this for?"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be > 0' }
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                {...register('type', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                {...register('txnDate', {
                  required: 'Date is required',
                  validate: (val) => new Date(val) <= new Date() || 'Future dates not allowed'
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              {errors.txnDate && <p className="text-red-500 text-xs mt-1">{errors.txnDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              {...register('notes')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Add some details..."
              rows={2}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors mt-6 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : transaction ? (
              <>
                <Save className="w-5 h-5" />
                <span>Update Transaction</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add Transaction</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
