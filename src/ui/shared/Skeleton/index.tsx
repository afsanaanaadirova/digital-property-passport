import { cn } from "@/app/utils/cn";
import type { SkeletonType } from "./skeleton.type";

const Skeleton = ({
  className = "w-full h-full min-h-[16px]",
}: SkeletonType) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-300 to-gray-400 rounded",
        className
      )}
    ></div>
  );
};

export default Skeleton;
