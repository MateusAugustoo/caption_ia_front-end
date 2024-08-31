import { X } from "lucide-react";

export function MessageRejection() {
  return (
    <p className="text-red-500 flex gap-1 items-center">
      <X color="#ef4444" size={16} />
      <span className="font-medium italic">
        The file format must be.mp4 or.mkv
      </span>
    </p>
  )
}