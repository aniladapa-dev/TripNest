import { motion } from 'framer-motion';
import Skeleton from '../ui/Skeleton';

export function TripGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-[20px] border border-border/50 h-[380px] overflow-hidden flex flex-col">
          <Skeleton width="w-full" height="h-48" rounded="rounded-none" />
          <div className="p-5 space-y-4 flex-1 bg-white">
            <div className="flex justify-between mb-4">
              <Skeleton width="w-1/4" height="h-4" />
              <Skeleton width="w-1/4" height="h-4" />
            </div>
            <Skeleton width="w-1/3" height="h-6" />
            
            <div className="mt-auto pt-6 space-y-2">
              <div className="flex justify-between">
                <Skeleton width="w-1/4" height="h-3" />
                <Skeleton width="w-1/6" height="h-3" />
              </div>
              <Skeleton width="w-full" height="h-2" rounded="rounded-full" />
              <Skeleton width="w-full" height="h-12" rounded="rounded-xl" className="mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TripListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-[20px] border border-border/50 h-[140px] flex overflow-hidden">
          <Skeleton width="w-[200px]" height="h-full" rounded="rounded-none" className="shrink-0" />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <Skeleton width="w-1/4" height="h-6" />
            <Skeleton width="w-1/3" height="h-4" />
            <Skeleton width="w-1/2" height="h-2" rounded="rounded-full" className="mt-4" />
          </div>
          <div className="p-5 w-48 flex flex-col justify-between border-l border-border/50 items-end">
             <Skeleton width="w-24" height="h-8" rounded="rounded-full" />
             <Skeleton width="w-full" height="h-10" rounded="rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
