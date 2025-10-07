import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Users,
  Globe,
  Lock,
  Save,
  RefreshCw
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      emergency: true
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false
    },
    hospital: {
      name: "New York Presbyterian Hospital",
      address: "525 E 68th St, New York, NY 10065",
      phone: "+1-212-746-5454",
      email: "info@nyp.org"
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-white/90">Configure hospital system preferences and security</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-sky-100 border-sky-300 text-sky-900">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-semibold text-sky-900">Notification Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Emergency Alerts</p>
                <p className="text-xs text-muted-foreground">Critical emergency notifications</p>
              </div>
              <Switch
                checked={settings.notifications.emergency}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'emergency', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-red-100 border-red-300 text-red-900">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Security Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Enhanced security for login</p>
              </div>
              <Switch
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => handleSettingChange('security', 'twoFactor', checked)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Expiry (days)</label>
              <Input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-slate-100 border-slate-300 text-slate-900">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">System Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Automatic Backup</p>
                <p className="text-xs text-muted-foreground">Daily automated backups</p>
              </div>
              <Switch
                checked={settings.system.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('system', 'autoBackup', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">System maintenance mode</p>
              </div>
              <Switch
                checked={settings.system.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('system', 'maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Debug Mode</p>
                <p className="text-xs text-muted-foreground">Enable debug logging</p>
              </div>
              <Switch
                checked={settings.system.debugMode}
                onCheckedChange={(checked) => handleSettingChange('system', 'debugMode', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Hospital Information */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-cyan-100 border-cyan-300 text-cyan-900">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-semibold text-cyan-900">Hospital Information</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hospital Name</label>
              <Input
                value={settings.hospital.name}
                onChange={(e) => handleSettingChange('hospital', 'name', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={settings.hospital.address}
                onChange={(e) => handleSettingChange('hospital', 'address', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={settings.hospital.phone}
                onChange={(e) => handleSettingChange('hospital', 'phone', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={settings.hospital.email}
                onChange={(e) => handleSettingChange('hospital', 'email', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button className="rounded-xl gradient-primary text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" className="rounded-xl">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
        <Button variant="outline" className="rounded-xl">
          <Lock className="w-4 h-4 mr-2" />
          Change Password
        </Button>
      </div>
    </div>
  );
}
