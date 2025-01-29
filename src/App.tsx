import React, { useState } from 'react';
import { ArrowUpRight, Wallet, BookOpen, Target, Users, BarChart3, Send, CreditCard, Receipt, UserPlus } from 'lucide-react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// This would typically come from your backend
const initialUserState = {
  balance: 0,
  transactions: [],
  budget: {
    total: 0,
    categories: {
      groceries: { limit: 0, spent: 0 },
      utilities: { limit: 0, spent: 0 },
      entertainment: { limit: 0, spent: 0 },
      others: { limit: 0, spent: 0 }
    }
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userData, setUserData] = useState(initialUserState);

  const handleLogin = (credentials) => {
    // In a real app, validate credentials against backend
    setIsAuthenticated(true);
    setShowLogin(false);
    // Here you would fetch the user's actual data from the backend
  };

  const handleRegister = (userData) => {
    // In a real app, send registration data to backend
    setUserData(initialUserState); // Start with zero balance for new users
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleTransaction = (type: 'credit' | 'debit', amount: number, description: string, category?: string) => {
    setUserData(prev => {
      const newBalance = type === 'credit' 
        ? prev.balance + amount 
        : prev.balance - amount;
      
      const newTransaction = {
        id: Date.now(),
        type,
        amount,
        description,
        date: new Date().toISOString(),
        status: 'completed',
        category
      };

      // Update budget spent amount if category is provided
      const newBudget = { ...prev.budget };
      if (category && type === 'debit') {
        newBudget.categories[category] = {
          ...newBudget.categories[category],
          spent: newBudget.categories[category].spent + amount
        };
      }

      return {
        ...prev,
        balance: newBalance,
        transactions: [newTransaction, ...prev.transactions],
        budget: newBudget
      };
    });
  };

  const handleUpdateBudget = (category: string, limit: number) => {
    setUserData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        categories: {
          ...prev.budget.categories,
          [category]: {
            ...prev.budget.categories[category],
            limit
          }
        }
      }
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(initialUserState);
  };

  if (isAuthenticated) {
    return (
      <Dashboard 
        userData={userData}
        onTransaction={handleTransaction}
        onUpdateBudget={handleUpdateBudget}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      
      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)} 
          onRegister={handleRegister}
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Hero Section */}
      <header className="bg-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">FinWise</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#education" className="text-gray-600 hover:text-indigo-600">Education</a>
              <a href="#community" className="text-gray-600 hover:text-indigo-600">Community</a>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Login
              </button>
              <button 
                onClick={() => setShowRegister(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Empowering Financial Freedom for Everyone
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access smart budgeting tools, low-cost payments, and financial education in your language. Join millions on their journey to financial stability.
            </p>
            <div className="flex space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                Start Your Journey
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070"
              alt="Financial Planning"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Smart Tools for Your Financial Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
                title: "Smart Budgeting",
                description: "Track expenses and create personalized budgets with our intuitive tools."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
                title: "Financial Education",
                description: "Learn essential financial skills through interactive lessons in your language."
              },
              {
                icon: <Target className="h-8 w-8 text-indigo-600" />,
                title: "Savings Goals",
                description: "Set and achieve your financial goals with automated tracking and reminders."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Connect with others on their financial journey. Share experiences, join savings groups, and grow together.
              </p>
              <div className="flex items-center space-x-4">
                <Users className="h-12 w-12 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">50,000+</p>
                  <p className="text-gray-600">Active Community Members</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074"
                alt="Community"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="h-6 w-6" />
                <span className="text-xl font-bold">FinWise</span>
              </div>
              <p className="text-gray-400">
                Empowering financial freedom for everyone through accessible tools and education.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Budgeting</li>
                <li>Payments</li>
                <li>Education</li>
                <li>Savings Goals</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;