import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({ label, type = 'text', error, className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  // Animation for validation failure
  const shakeAnimation = {
    x: error ? [-10, 10, -10, 10, -5, 5, 0] : 0,
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      className={`relative w-full ${className}`}
      animate={shakeAnimation}
    >
      <div 
        className={`relative w-full flex items-center border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-colors duration-300 ${
          error ? 'border-red-500' : isFocused ? 'border-primary' : 'border-border hover:border-text-muted'
        }`}
      >
        <input
          ref={ref}
          type={inputType}
          className="peer w-full h-14 bg-transparent px-4 pt-4 pb-1 outline-none text-text text-sm z-10"
          {...props}
          placeholder={isFocused ? props.placeholder : " "}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
        />
        
        {/* Floating Label */}
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none z-0 ${
            error ? 'text-red-500' : isFocused ? 'text-primary' : 'text-text-muted'
          } peer-focus:text-xs peer-focus:-translate-y-3 peer-focus:top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:top-4 top-1/2 -translate-y-1/2 text-sm`}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-text-muted hover:text-text transition-colors z-20 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1.5 ml-1 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';
export default Input;
