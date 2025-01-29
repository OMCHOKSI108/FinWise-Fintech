import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const Ledger: React.FC = () => {
  const [entries] = useState([
    {
      id: 1,
      date: '2024-03-15',
      customer: 'John Doe',
      type: 'credit',
      amount: 1500,
      status: 'paid',
      description: 'Payment received for Invoice #1234'
    },
    {
      id: 2,
      date: '2024-03-14',
      customer: 'Jane Smith',
      type: 'debit',
      amount: 800,
      status: 'pending',
      description: 'Inventory purchase'
    },
    // Add more entries as needed
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(entry.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entry.customer}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center ${
                  entry.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.type === 'credit' ? (
                    <Plus className="h-4 w-4 mr-1" />
                  ) : (
                    <Minus className="h-4 w-4 mr-1" />
                  )}
                  {entry.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₹{entry.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  entry.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;