import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Main Dashboard Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions Skeleton */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-md" />
                ))}
            </CardContent>
          </Card>

          {/* Recent Activities Skeleton */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-4 w-4 rounded-full mr-4 mt-0.5" />
                      <div className="w-full">
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
          </Card>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-8">
          <div className="flex mb-4 overflow-x-auto">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 mr-2 rounded-md" />
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(2)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array(3)
                        .fill(null)
                        .map((_, j) => (
                          <div key={j} className="space-y-2">
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

