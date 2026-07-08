import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import OTPInput from '../../components/auth/OTPInput';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { authService } from '../../services/authService';

export default function OTPVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const context = location.state?.context || 'register';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    setCountdown(60);
    try {
      await authService.resendOTP(email);
    } catch (err) {
      setAuthError('Failed to resend code');
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setAuthError('Please enter all 6 digits');
      return;
    }
    
    setIsLoading(true);
    setAuthError('');
    try {
      await authService.verifyOTP(otp);
      setIsSuccess(true);
      
      setTimeout(() => {
        if (context === 'reset') {
          navigate('/reset-password', { state: { email } });
        } else {
          navigate('/email-verified');
        }
      }, 2000);
    } catch (err) {
      setAuthError(err.message || 'Verification failed');
      // Shake effect
      const otpContainer = document.getElementById('otp-container');
      if (otpContainer) {
        otpContainer.classList.add('animate-shake');
        setTimeout(() => otpContainer.classList.remove('animate-shake'), 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Link to={context === 'reset' ? '/forgot-password' : '/register'} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} />
        Back
      </Link>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h2 className="text-3xl font-heading font-bold text-text mb-2">Check your email</h2>
            <p className="text-text-secondary mb-8">
              We sent a verification code to <span className="font-semibold text-text">{email}</span>
            </p>

            <div className="space-y-8">
              {authError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center"
                >
                  {authError}
                </motion.div>
              )}

              <div id="otp-container">
                <OTPInput length={6} onComplete={(val) => {
                  setOtp(val);
                  setAuthError('');
                }} />
              </div>

              <Button 
                onClick={handleVerify}
                variant="primary" 
                className="w-full h-14 text-lg"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? <LoadingSpinner /> : 'Verify Account'}
              </Button>

              <div className="text-center text-sm">
                <p className="text-text-secondary">
                  Didn't receive the code?{' '}
                  {countdown > 0 ? (
                    <span className="font-medium">Resend in {countdown}s</span>
                  ) : (
                    <button onClick={handleResend} className="text-primary font-semibold hover:underline">
                      Resend Code
                    </button>
                  )}
                </p>
              </div>
            </div>
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
            <h3 className="text-2xl font-heading font-bold mb-2">Verified successfully!</h3>
            <p className="text-text-secondary">
              Redirecting...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}} />
    </AuthLayout>
  );
}
