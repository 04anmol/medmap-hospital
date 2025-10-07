import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Bed, 
  Droplet, 
  Wind, 
  Ambulance,
  Users,
  Stethoscope,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Requests", href: "/requests", icon: AlertCircle, badge: 3 },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Beds", href: "/beds", icon: Bed },
  { name: "Emergency", href: "/emergency", icon: Stethoscope },
  { name: "More", href: "/settings", icon: Settings },
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
                  {item.badge && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emergency text-white text-[10px] flex items-center justify-center font-bold">
                      {item.badge}
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
