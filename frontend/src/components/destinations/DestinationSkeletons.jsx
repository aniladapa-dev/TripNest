import React from 'react';

export function DestinationGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
          {/* Image skeleton */}
          <div className="h-64 bg-slate-200 dark:bg-slate-800 w-full"></div>
          
          {/* Content skeleton */}
          <div className="p-5 flex flex-col gap-4">
            {/* Title and Rating */}
            <div className="flex justify-between items-center">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-12"></div>
            </div>
            
            {/* Location */}
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
            
            {/* Badges/Tags */}
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
            </div>
            
            {/* Price */}
            <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DestinationDetailsSkeleton() {
  return (
    <div className="animate-pulse w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header/Title Skeleton */}
      <div className="mb-6">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 md:w-1/3 mb-4"></div>
        <div className="flex items-center gap-4">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-32"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-48"></div>
        </div>
      </div>

      {/* Hero Banner Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden">
        <div className="md:col-span-2 row-span-2 bg-slate-200 dark:bg-slate-800"></div>
        <div className="hidden md:block bg-slate-200 dark:bg-slate-800"></div>
        <div className="hidden md:block bg-slate-200 dark:bg-slate-800"></div>
        <div className="hidden md:block bg-slate-200 dark:bg-slate-800"></div>
        <div className="hidden md:block bg-slate-200 dark:bg-slate-800"></div>
      </div>

      {/* Split Columns Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1 */}
          <div>
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
            </div>
          </div>
          
          {/* Section 2 - Amenities/Highlights */}
          <div>
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-40 mb-6"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar/Booking Area */}
        <div className="lg:col-span-1">
          <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-80 sticky top-24">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-32 mb-6"></div>
            <div className="space-y-4 mb-8">
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
            </div>
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
