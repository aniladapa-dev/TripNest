import { motion } from 'framer-motion';
import Skeleton from '../ui/Skeleton';

export function ItinerarySkeletons() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white rounded-[24px] p-6 border border-border/50 shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-4 flex-1">
          <Skeleton width="w-1/3" height="h-8" rounded="rounded-lg" />
          <div className="flex gap-4">
            <Skeleton width="w-24" height="h-6" rounded="rounded-md" />
            <Skeleton width="w-24" height="h-6" rounded="rounded-md" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton width="w-32" height="h-10" rounded="rounded-xl" />
          <Skeleton width="w-32" height="h-10" rounded="rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="w-full lg:w-64 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height="h-12" rounded="rounded-xl" className="border border-border/50 bg-white" />
          ))}
        </div>

        {/* Main Area Skeleton */}
        <div className="flex-1 space-y-6">
          <Skeleton width="w-1/4" height="h-10" rounded="rounded-xl" className="mb-8" />
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <Skeleton width="w-4" height="h-4" rounded="rounded-full" />
                <div className="w-0.5 h-32 bg-gray-100"></div>
              </div>
              {/* Card */}
              <div className="flex-1 bg-white rounded-2xl border border-border/50 p-5 h-32 flex flex-col justify-between">
                <div className="flex justify-between mb-4">
                  <Skeleton width="w-1/3" height="h-6" />
                  <Skeleton width="w-16" height="h-6" />
                </div>
                <div className="space-y-2 mt-auto">
                  <Skeleton width="w-3/4" height="h-4" />
                  <Skeleton width="w-1/2" height="h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
