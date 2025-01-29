import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PaymentFormProps {
  onClose: () => void;
  onSubmit: (data: { recipientNumber: string; amount: number; note: string; category: string }) => void;
  maxAmount: number;
  categories: string[];
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onClose, onSubmit, maxAmount, categories }) => {
  const [formData, setFormData] = useState({
    recipientNumber: '',
    amount: '',
    note: '',
    category: 'others'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(formData.amount);
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (amount > maxAmount) {
      alert('Insufficient balance');
      return;
    }
    onSubmit({
      ...formData,
      amount: Number(formData.amount)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipientNumber" className="block text-sm font-medium text-gray-700">
              Recipient's UPI ID / Phone Number
            </label>
            <input
              type="text"
              id="recipientNumber"
              name="recipientNumber"
              value={formData.recipientNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              max={maxAmount}
              step="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">Available balance: ₹{maxAmount}</p>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Expense Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Note (Optional)
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Money
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;