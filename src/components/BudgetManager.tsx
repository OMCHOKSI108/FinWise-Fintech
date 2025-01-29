import React, { useState } from 'react';
import { X } from 'lucide-react';

interface BudgetManagerProps {
  budget: {
    total: number;
    categories: {
      [key: string]: {
        limit: number;
        spent: number;
      };
    };
  };
  onClose: () => void;
  onUpdateBudget: (category: string, limit: number) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ budget, onClose, onUpdateBudget }) => {
  const [limits, setLimits] = useState(() => {
    const initialLimits: { [key: string]: string } = {};
    Object.entries(budget.categories).forEach(([category, data]) => {
      initialLimits[category] = data.limit.toString();
    });
    return initialLimits;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(limits).forEach(([category, limit]) => {
      onUpdateBudget(category, Number(limit));
    });
    onClose();
  };

  const handleChange = (category: string, value: string) => {
    setLimits(prev => ({
      ...prev,
      [category]: value
    }));
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
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Budget</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(budget.categories).map(([category, data]) => (
            <div key={category}>
              <label htmlFor={category} className="block text-sm font-medium text-gray-700 capitalize">
                {category} Budget Limit
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id={category}
                  value={limits[category]}
                  onChange={(e) => handleChange(category, e.target.value)}
                  className="mt-1 block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Spent: ₹{data.spent} / ₹{data.limit}
              </p>
            </div>
          ))}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save Budget Limits
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetManager;