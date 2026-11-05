import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "ai";
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  status,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  const getInitials = (text?: string) => {
    if (!text) return "AV";
    const parts = text.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-zinc-500",
    ai: "bg-violet-400 shadow-sm shadow-violet-500/50",
  };

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 font-medium text-zinc-200 select-none overflow-hidden",
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || name || "Avatar"}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-semibold tracking-wider text-zinc-300">
          {getInitials(name)}
        </span>
      )}

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[#070707]",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
