import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Bed, 
  Droplet, 
  Wind, 
  Ambulance,
  LogOut,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  Stethoscope,
  Heart,
  Pill,
  Activity,
  Clock,
  Shield,
  UserCheck,
  ClipboardList,
  TrendingUp,
  Bell,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  // Core Operations
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "core" },
  { name: "Live Requests", href: "/requests", icon: AlertCircle, section: "core", badge: 3 },
  
  // Patient Management
  { name: "Patient Registry", href: "/patients", icon: Users, section: "patients" },
  { name: "Admissions", href: "/admissions", icon: UserCheck, section: "patients" },
  { name: "Discharges", href: "/discharges", icon: Heart, section: "patients" },
  { name: "Medical Records", href: "/records", icon: FileText, section: "patients" },
  
  // Resource Management
  { name: "Beds & ICU", href: "/beds", icon: Bed, section: "resources" },
  { name: "Blood Bank", href: "/blood", icon: Droplet, section: "resources" },
  { name: "Oxygen & Equipment", href: "/oxygen", icon: Wind, section: "resources" },
  { name: "Ambulances", href: "/ambulances", icon: Ambulance, section: "resources" },
  { name: "Pharmacy", href: "/pharmacy", icon: Pill, section: "resources" },
  
  // Medical Services
  { name: "Emergency Dept", href: "/emergency", icon: Stethoscope, section: "medical" },
  { name: "Surgery Schedule", href: "/surgery", icon: Activity, section: "medical" },
  { name: "Lab Results", href: "/lab", icon: ClipboardList, section: "medical" },
  { name: "Radiology", href: "/radiology", icon: Shield, section: "medical" },
  
  // Operations & Analytics
  { name: "Staff Management", href: "/staff", icon: Users, section: "operations" },
  { name: "Schedule", href: "/schedule", icon: Calendar, section: "operations" },
  { name: "Reports", href: "/reports", icon: BarChart3, section: "operations" },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, section: "operations" },
  { name: "Notifications", href: "/notifications", icon: Bell, section: "operations" },
  
  // System
  { name: "Settings", href: "/settings", icon: Settings, section: "system" },
  { name: "Database", href: "/database", icon: Database, section: "system" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="/logo.png" alt="MedMap Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-lg">MedMap</h2>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {(() => {
          const sections = {
            core: { title: "Core Operations", items: [] },
            patients: { title: "Patient Management", items: [] },
            resources: { title: "Resource Management", items: [] },
            medical: { title: "Medical Services", items: [] },
            operations: { title: "Operations & Analytics", items: [] },
            system: { title: "System", items: [] }
          };

          // Group items by section
          navigation.forEach(item => {
            if (sections[item.section]) {
              sections[item.section].items.push(item);
            }
          });

          return Object.entries(sections).map(([sectionKey, section]) => {
            if (section.items.length === 0) return null;
            
            return (
              <div key={sectionKey} className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
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
                            {item.badge && (
                              <span className="ml-auto w-5 h-5 rounded-full bg-emergency text-emergency-foreground text-xs flex items-center justify-center font-bold">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          });
        })()}
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
