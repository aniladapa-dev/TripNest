import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import PasswordStrengthMeter from '../../components/auth/PasswordStrengthMeter';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { authService } from '../../services/authService';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await authService.resetPassword(data.password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setAuthError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-heading font-bold text-text mb-2">Set new password</h2>
            <p className="text-text-secondary mb-8">
              Your new password must be different from previously used passwords.
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

              <div>
                <Input
                  label="New Password"
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

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-14 text-lg mt-4"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Reset Password'}
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
              className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="text-2xl font-heading font-bold mb-2">Password reset</h3>
            <p className="text-text-secondary">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
