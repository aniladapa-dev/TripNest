/**
 * Formats a number to the Indian numbering system with the Rupee symbol (₹).
 * Example: 150000 -> "₹1,50,000"
 */
export const formatINR = (value) => {
  if (value === null || value === undefined) return '';
  
  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  
  if (isNaN(num)) return value; // Return original if not a number

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Most travel budgets don't need decimals
    minimumFractionDigits: 0,
  }).format(num);
};

/**
 * Formats a number to Indian system WITHOUT the currency symbol.
 * Example: 150000 -> "1,50,000"
 */
export const formatIndianNumber = (value) => {
  if (value === null || value === undefined) return '';
  
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  
  if (isNaN(num)) return value;

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(num);
};
