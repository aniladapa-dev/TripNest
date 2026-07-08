import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OTPInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger onComplete
    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move back on backspace if current field is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    if (pastedData.some(isNaN)) return;

    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = pastedData.length < length ? pastedData.length : length - 1;
    inputRefs.current[nextIndex]?.focus();

    if (pastedData.length === length) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-4" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <motion.input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          whileFocus={{ scale: 1.05, y: -2 }}
          className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-heading font-bold border-2 rounded-xl outline-none transition-colors bg-white/50 backdrop-blur-sm shadow-sm
            ${digit ? 'border-primary text-primary' : 'border-border text-text focus:border-primary focus:shadow-glow'}
          `}
        />
      ))}
    </div>
  );
}
