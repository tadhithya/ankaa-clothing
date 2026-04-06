function SkeletonCard() {
  return (
    <div className="animate-pulse">
      
      <div className="bg-gray-700 h-72 w-full rounded"></div>

      <div className="mt-3 h-4 bg-gray-700 w-3/4 rounded"></div>
      <div className="mt-2 h-4 bg-gray-700 w-1/2 rounded"></div>

    </div>
  );
}

export default SkeletonCard;