import { Skeleton } from "./ui/skeleton"

export const SkeletonLoading = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-[280px] w-[345px] bg-amber-950" />
        ))}
      </div>        
    )
}
