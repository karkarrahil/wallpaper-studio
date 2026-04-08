const SkeletonCard = () => {
  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-xl w-64 h-64 relative overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-full bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 bg-[length:200%_100%] animate-shimmer" />
      
      {/* Bottom description skeleton */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 space-y-2">
        <div className="h-3 bg-slate-600 dark:bg-slate-500 rounded w-3/4" />
        <div className="h-2 bg-slate-600 dark:bg-slate-500 rounded w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
