import React from 'react';

const shimmerClass = "bg-gray-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Skeleton({ className = '', rounded = 'rounded', width = 'w-full', height = 'h-full', ...props }) {
  return (
    <div className={`${shimmerClass} ${rounded} ${width} ${height} ${className}`} {...props}></div>
  );
}
