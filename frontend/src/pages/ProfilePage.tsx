import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { User as UserIcon, Calendar, IndianRupee } from 'lucide-react';
import Navbar from '../components/Navbar';

interface FormData {
  name: string;
  age: number;
  monthlyIncome: number;
}

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      age: user?.age || undefined,
      monthlyIncome: user?.monthlyIncome || undefined,
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white shadow sm:rounded-lg p-6 lg:p-10 mb-auto mt-4">
          <div className="sm:flex sm:items-center border-b border-gray-200 pb-6 mb-6">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
              <p className="mt-2 text-sm text-gray-700">
                Update your personal information and application preferences.
              </p>
            </div>
            {user?.picture && (
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <img src={user.picture} alt="Profile" className="h-16 w-16 rounded-full shadow-md" />
                </div>
            )}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 pl-10 h-10 border"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="age"
                            type="number"
                            {...register('age', { 
                                required: 'Age is required',
                                min: { value: 1, message: 'Age must be positive' }
                            })}
                            className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 pl-10 h-10 border"
                        />
                    </div>
                    {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
                </div>

                <div>
                    <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">Monthly Income (₹)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IndianRupee className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="monthlyIncome"
                            type="number"
                            step="0.01"
                            {...register('monthlyIncome', { 
                                required: 'Monthly income is required',
                                min: { value: 0, message: 'Income cannot be negative' }
                            })}
                            className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 pl-10 h-10 border"
                        />
                    </div>
                    {errors.monthlyIncome && <p className="mt-1 text-sm text-red-600">{errors.monthlyIncome.message}</p>}
                </div>
            </div>

            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
