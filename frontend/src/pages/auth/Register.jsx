import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import SocialLogin from '../../components/auth/SocialLogin';
import PasswordStrengthMeter from '../../components/auth/PasswordStrengthMeter';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { authService } from '../../services/authService';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onChange' // For real-time validation
  });
  
  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await authService.register(data);
      // Navigate to OTP verification instead of directly logging in
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      setAuthError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join TripNest and start planning smarter."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
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
          label="Full Name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email address"
            type="email"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
          />
          <Input
            label="Phone Number"
            type="tel"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' }
            })}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <Input
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
        />

        <label className="flex items-start gap-3 mt-4 mb-2 cursor-pointer group">
          <div className="mt-1">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
              {...register('agreeTerms', { required: 'You must agree to the terms' })}
            />
          </div>
          <span className={`text-sm transition-colors ${errors.agreeTerms ? 'text-red-500' : 'text-text-secondary group-hover:text-text'}`}>
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </span>
        </label>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-14 text-lg mt-2"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : 'Create Account'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        <span className="text-text-muted text-sm font-medium">OR</span>
      </div>

      <SocialLogin mode="register" />

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
