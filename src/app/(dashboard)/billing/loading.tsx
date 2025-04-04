import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="mt-4 md:mt-0">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-20 w-full mb-8 rounded-lg" />

      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-10 w-full mb-6" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  )
}

