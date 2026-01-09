
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
}

export default function Loading() {
  return (
    <main className="p-8 min-h-screen bg-gray-50">
      
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" /> 
        <Skeleton className="h-4 w-96" />      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-64 flex flex-col justify-between">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 h-64">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex items-end space-x-4 h-40 pb-2">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className={`w-full rounded-t h-${Math.floor(Math.random() * 20) + 10}`} />
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" /> 
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}