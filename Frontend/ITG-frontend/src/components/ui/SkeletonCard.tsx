import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard: React.FC = () => {
    return (
        <div className="rounded-md mb-2 bg-white shadow-sm p-3 flex flex-col gap-4 min-w-[275px] lg:w-[calc(33.33333%-12px)] hover:shadow-lg transition-all justify-between">
            <div className="flex gap-2">
                <Skeleton className="rounded-full w-12 h-12" />
                <div className="flex flex-col gap-1 flex-1">
                    <Skeleton className="h-4 w-2/5" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Bottom section: status, location, bookmark */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-5" />
            </div>
        </div>
    );
};

export default SkeletonCard;
