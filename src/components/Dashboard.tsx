import React, { useState } from 'react';
import { Wallet, Send, CreditCard, Receipt, BarChart3, Package, Users, ArrowRight } from 'lucide-react';
import PaymentForm from './PaymentForm';
import Ledger from './Ledger';
import BudgetManager from './BudgetManager';

interface DashboardProps {
  userData: {
    balance: number;
    transactions: any[];
    budget: {
      total: number;
      categories: {
        [key: string]: {
          limit: number;
          spent: number;
        };
      };
    };
  };
  onTransaction: (type: 'credit' | 'debit', amount: number, description: string, category?: string) => void;
  onUpdateBudget: (category: string, limit: number) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onTransaction, onUpdateBudget, onLogout }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBudgetManager, setShowBudgetManager] = useState(false);

  const handleAddMoney = () => {
    const amount = prompt('Enter amount to add to wallet:');
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      onTransaction('credit', Number(amount), 'Added money to wallet');
    }
  };

  const getBudgetStatus = (category: string) => {
    const { limit, spent } = userData.budget.categories[category];
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showPaymentForm && (
        <PaymentForm 
          onClose={() => setShowPaymentForm(false)}
          onSubmit={(data) => {
            if (userData.balance >= data.amount) {
              onTransaction('debit', data.amount, `Payment to ${data.recipientNumber}`, data.category);
              setShowPaymentForm(false);
            } else {
              alert('Insufficient balance!');
            }
          }}
          maxAmount={userData.balance}
          categories={Object.keys(userData.budget.categories)}
        />
      )}

      {showBudgetManager && (
        <BudgetManager
          budget={userData.budget}
          onClose={() => setShowBudgetManager(false)}
          onUpdateBudget={onUpdateBudget}
        />
      )}
      
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">FinWise</span>
            </div>
            <button 
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Wallet Balance Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Wallet Balance</h3>
              <Wallet className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{userData.balance}</p>
            <button
              onClick={() => setShowPaymentForm(true)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Money
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleAddMoney}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <CreditCard className="h-5 w-5" />
                <span>Add Money</span>
              </button>
              <button 
                onClick={() => setShowBudgetManager(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <Receipt className="h-5 w-5" />
                <span>Manage Budget</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                <Package className="h-5 w-5" />
                <span>Expenses</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                <Users className="h-5 w-5" />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Budget Overview Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Budget Overview</h3>
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="space-y-2">
              {Object.entries(userData.budget.categories).map(([category, data]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{category}</span>
                  <div className="text-right">
                    <span className={`font-semibold ${getBudgetStatus(category)}`}>
                      ₹{data.spent}
                    </span>
                    <span className="text-gray-400"> / ₹{data.limit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
            <button className="text-indigo-600 hover:text-indigo-700 flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <Ledger transactions={userData.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;