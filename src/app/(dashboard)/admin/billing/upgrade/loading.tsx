import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <Skeleton className="h-10 w-48 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[420px] w-full rounded-lg" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-10 w-full mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-[300px] w-full rounded-lg mb-6" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
