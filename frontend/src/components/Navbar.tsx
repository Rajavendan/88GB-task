import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to="/dashboard" className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-primary-600">
              FinanceTracker
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  {user?.picture ? (
                    <img
                      className="w-8 h-8 rounded-full shadow-sm"
                      src={user.picture}
                      alt="user photo"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 p-1 rounded-full bg-gray-100 text-gray-500 shadow-sm" />
                  )}
                  <span className="hidden sm:inline-block text-sm font-medium">
                    {user?.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline-block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
