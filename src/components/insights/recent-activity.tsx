import React from "react";

export interface ActivityItem {
  time: string;
  label: string;
}

export interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-zinc-100">Recent analysis activity</h2>
      </div>

      <div className="relative space-y-4 before:absolute before:left-[6px] before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-white/[0.08]">
        {activities.map((activity) => (
          <div key={`${activity.time}-${activity.label}`} className="relative pl-6">
            <span className="absolute left-[1px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-500 ring-4 ring-[#0D0D13]" />
            <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">{activity.time}</div>
            <div className="mt-1 text-sm text-zinc-200">{activity.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
