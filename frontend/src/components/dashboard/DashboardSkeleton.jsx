import { motion } from 'framer-motion';
import Skeleton from '../ui/Skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-8 w-full">
      {/* ── Welcome Banner Skeleton ── */}
      <Skeleton height="h-[250px]" rounded="rounded-[24px]" />

      {/* ── KPI Stat Cards Skeleton ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-[20px] border border-border/50 p-6 h-[140px] flex flex-col justify-between">
            <div className="flex justify-between">
              <Skeleton width="w-12" height="h-12" rounded="rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Skeleton width="w-1/2" height="h-4" />
              <Skeleton width="w-3/4" height="h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid Skeleton ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2) */}
        <div className="xl:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-end mb-6">
              <Skeleton width="w-40" height="h-8" />
              <Skeleton width="w-16" height="h-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-[20px] border border-border/50 h-[380px] overflow-hidden flex flex-col">
                  <Skeleton width="w-full" height="h-40" rounded="rounded-none" />
                  <div className="p-5 space-y-4 flex-1">
                    <Skeleton width="w-1/2" height="h-4" />
                    <Skeleton width="w-3/4" height="h-4" />
                    <div className="mt-auto space-y-2">
                      <Skeleton width="w-full" height="h-2" />
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <Skeleton width="w-full" height="h-10" rounded="rounded-lg" />
                        <Skeleton width="w-full" height="h-10" rounded="rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <Skeleton className="bg-white border border-border/50" height="h-[400px]" rounded="rounded-[20px]" />
            <Skeleton className="bg-white border border-border/50" height="h-[400px]" rounded="rounded-[20px]" />
          </div>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-8">
          <Skeleton height="h-[200px]" rounded="rounded-2xl" />
          <Skeleton className="bg-white border border-border/50" height="h-[400px]" rounded="rounded-[20px]" />
          <Skeleton className="bg-white border border-border/50" height="h-[300px]" rounded="rounded-[20px]" />
        </div>
      </div>
    </div>
  );
}
