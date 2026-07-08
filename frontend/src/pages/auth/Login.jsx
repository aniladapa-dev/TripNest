import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import SocialLogin from '../../components/auth/SocialLogin';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { authService } from '../../services/authService';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await authService.login(data.email, data.password);
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setAuthError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your details to access your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {authError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center"
          >
            {authError}
          </motion.div>
        )}

        <Input
          label="Email address"
          type="email"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
          })}
        />

        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required'
          })}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
              {...register('remember')}
            />
            <span className="text-text-secondary group-hover:text-text transition-colors">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-primary font-semibold hover:text-primary-dark transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-14 text-lg"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : 'Log In'}
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        <span className="text-text-muted text-sm font-medium">OR</span>
      </div>

      <SocialLogin mode="login" />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
