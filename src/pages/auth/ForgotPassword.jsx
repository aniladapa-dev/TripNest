import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { authService } from '../../services/authService';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await authService.forgotPassword(data.email);
      setIsSuccess(true);
      // Wait 3 seconds then go to OTP page
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: data.email, context: 'reset' } });
      }, 3000);
    } catch (err) {
      setAuthError(err.message || 'Failed to process request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="text-3xl font-heading font-bold text-text mb-2">Forgot Password</h2>
            <p className="text-text-secondary mb-8">
              No worries! Enter your email address and we'll send you a code to reset your password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-14 text-lg"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Send Reset Code'}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="text-2xl font-heading font-bold mb-2">Check your email</h3>
            <p className="text-text-secondary">
              We've sent a 6-digit verification code to your email address. Redirecting...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
