import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showSearch?: boolean;
  showFilters?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 6,
  showSearch = true,
  showFilters = true, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  return (
    <Card className="rounded-2xl shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard p-6">
      {/* Barre de recherche et filtres skeleton */}
      {showSearch && (
        <div className="grid grid-cols-12 gap-3 items-center mb-6">
          <div className="col-span-12 lg:col-span-4">
            <Skeleton className="h-10 w-[320px] rounded-lg" />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="flex lg:justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-lg" />
              <div className="flex border border-borderInput rounded-lg">
                <Skeleton className="h-8 w-[180px] rounded-none" />
                <Skeleton className="h-8 w-[180px] rounded-none" />
                <Skeleton className="h-8 w-[180px] rounded-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tableau skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-borderInput">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="text-left py-3 px-4">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-borderInput/50">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="py-4 px-4">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </Card>
  );
};
