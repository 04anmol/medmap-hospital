import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Bed, 
  Droplet, 
  Wind, 
  Ambulance
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Requests", href: "/requests", icon: AlertCircle },
  { name: "Beds", href: "/beds", icon: Bed },
  { name: "Blood", href: "/blood", icon: Droplet },
  { name: "Oxygen", href: "/oxygen", icon: Wind },
  { name: "Fleet", href: "/ambulances", icon: Ambulance },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-6 gap-1 p-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-2 py-2 rounded-xl text-xs font-medium transition-colors relative",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="truncate w-full text-center">{item.name}</span>
                  {item.name === "Requests" && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emergency text-white text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
