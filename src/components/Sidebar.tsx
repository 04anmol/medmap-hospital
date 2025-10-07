import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Bed, 
  Droplet, 
  Wind, 
  Ambulance,
  Hospital,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Live Requests", href: "/requests", icon: AlertCircle },
  { name: "Beds & ICU", href: "/beds", icon: Bed },
  { name: "Blood Bank", href: "/blood", icon: Droplet },
  { name: "Oxygen & Equipment", href: "/oxygen", icon: Wind },
  { name: "Ambulances", href: "/ambulances", icon: Ambulance },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Hospital className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">MedMap</h2>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.name === "Live Requests" && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-emergency text-emergency-foreground text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">NY</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">NY Presbyterian</p>
            <p className="text-xs text-muted-foreground truncate">admin@hospital.com</p>
          </div>
        </div>
        <Button variant="outline" className="w-full rounded-xl" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
