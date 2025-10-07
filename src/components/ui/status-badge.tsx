import { cn } from "@/lib/utils";

export type StatusType = "available" | "low" | "out" | "occupied" | "cleaning" | "blocked" | "dispatched" | "enroute" | "onduty" | "off";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-success/10 text-success border-success/20" },
  low: { label: "Low", className: "bg-warning/10 text-warning border-warning/20" },
  out: { label: "Out", className: "bg-emergency/10 text-emergency border-emergency/20" },
  occupied: { label: "Occupied", className: "bg-info/10 text-info border-info/20" },
  cleaning: { label: "Cleaning", className: "bg-muted text-muted-foreground border-border" },
  blocked: { label: "Blocked", className: "bg-destructive/10 text-destructive border-destructive/20" },
  dispatched: { label: "Dispatched", className: "bg-warning/10 text-warning border-warning/20" },
  enroute: { label: "En route", className: "bg-info/10 text-info border-info/20" },
  onduty: { label: "On Duty", className: "bg-success/10 text-success border-success/20" },
  off: { label: "Off", className: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
