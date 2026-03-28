import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import { Wallet, PieChart, TrendingUp, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await login(idToken);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Firebase Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    }
  };

  const features = [
    {
      title: 'Smart Tracking',
      description: 'Easily log and categorize every rupee spent or earned.',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Visual Insights',
      description: 'See your spending habits with intuitive pie and bar charts.',
      icon: PieChart,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Budget Control',
      description: 'Stay on top of your finances and build your savings.',
      icon: Wallet,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Secure Access',
      description: 'State-of-the-less JWT authentication with Google OAuth.',
      icon: ShieldCheck,
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-1 p-8 md:p-20 flex flex-col justify-center bg-white border-r border-gray-100">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-primary-900 tracking-tight">
              FinanceTracker
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Take Control of Your <span className="text-primary-600 underline decoration-primary-300">Money</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            The simplest way to track your expenses, manage your budget, and reach your financial goals.
          </p>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
              Get started with Google
            </p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-full py-3 px-6 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
          </div>

          <p className="mt-12 text-xs text-gray-400">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-primary-50 p-8 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
