# MedMap Hospital Provider Dashboard

A comprehensive hospital/provider frontend for MedMap that enables real-time emergency resource management, ambulance dispatch, and coordination with emergency medical services.

## 🎨 Design Philosophy

This application perfectly mirrors the **user app** design with:
- **Purple gradient theme** (#6F4CF6 → #9A68FF) for primary elements
- **Rounded, soft UI** with 2xl border radius cards
- **Pill-style filters** with smooth interactions
- **Status badges** for quick visual feedback
- **Gradient headers** for each major section
- **Responsive design** from mobile to desktop

### Color Palette

- **Primary (Purple)**: `#6F4CF6` → `#9A68FF` for headers, CTAs, and brand elements
- **Emergency (Coral Red)**: `#FF5A5F` for urgent alerts and blood-related items
- **Success (Teal)**: `#2ED47A` for available status and positive actions
- **Info (Sky Blue)**: `#3ABFF8` for informational elements
- **Warning (Amber)**: Alerts and low-stock warnings

## 📱 Features

### Core Pages

1. **Login** (`/login`)
   - Clean authentication interface
   - Mock login with demo credentials
   - Purple gradient branding

2. **Dashboard** (`/dashboard`)
   - Real-time KPI cards (ICU beds, ventilators, blood units, ambulances)
   - Quick action tiles for common tasks
   - Recent activity feed
   - Performance metrics

3. **Live Requests** (`/requests`)
   - Incoming emergency request queue
   - Priority badges (Critical, High, Medium)
   - SLA countdown timers
   - Accept/Decline actions with patient intake flow
   - Resource requirement chips

4. **Beds & ICU** (`/beds`)
   - Bed availability grid
   - Status management (Available, Occupied, Cleaning, Blocked)
   - Ward-based filtering
   - Ventilator indicators
   - One-tap status updates

5. **Blood Bank** (`/blood`)
   - Blood type inventory (A+, A-, B+, B-, AB+, AB-, O+, O-)
   - Stock level indicators with thresholds
   - Quick add/remove units
   - Low stock alerts
   - Component filtering (Whole Blood, Plasma, Platelets, RBC)

6. **Oxygen & Equipment** (`/oxygen`)
   - Oxygen cylinder inventory by size
   - Available/In Use/Refilling status
   - Medical equipment tracking (Ventilators, Monitors, Infusion Pumps, Defibrillators)
   - Availability progress bars

7. **Ambulances** (`/ambulances`)
   - Fleet management grid
   - Real-time location tracking (mock)
   - Driver contact buttons
   - Dispatch functionality
   - Status filtering (On Duty, Dispatched, En Route, Off)

### Navigation

- **Desktop**: Left sidebar with full navigation and profile
- **Mobile**: Bottom navigation bar with 6 quick-access tabs
- **Responsive**: Seamless experience from 360px to 4K displays

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: shadcn/ui (customized)
- **Icons**: lucide-react
- **State Management**: React hooks (ready for Zustand/React Query integration)
- **Routing**: React Router v6
- **Notifications**: Sonner toasts

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:8080`

### Demo Credentials

```
Email: admin@hospital.com
Password: password
```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Sidebar.tsx      # Desktop navigation
│   ├── MobileNav.tsx    # Mobile bottom nav
│   └── DashboardLayout.tsx  # Layout wrapper
├── pages/
│   ├── Login.tsx        # Authentication
│   ├── Dashboard.tsx    # Main dashboard
│   ├── LiveRequests.tsx # Emergency queue
│   ├── Beds.tsx         # Bed management
│   ├── BloodBank.tsx    # Blood inventory
│   ├── Oxygen.tsx       # Oxygen & equipment
│   └── Ambulances.tsx   # Fleet management
├── lib/
│   └── utils.ts         # Utility functions
├── index.css            # Design system tokens
└── App.tsx              # Root component with routing
```

## 🎨 Design System

All design tokens are defined in `src/index.css` and `tailwind.config.ts`:

### HSL Color Variables

```css
--primary: 253 90% 64%;           /* Deep purple */
--primary-light: 263 100% 71%;    /* Light purple */
--emergency: 358 100% 67%;        /* Coral red */
--success: 152 69% 53%;           /* Teal green */
--info: 198 93% 60%;              /* Sky blue */
--warning: 38 92% 50%;            /* Amber */
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, hsl(253 90% 64%), hsl(263 100% 71%));
--gradient-emergency: linear-gradient(135deg, hsl(358 100% 67%), hsl(0 84% 60%));
--gradient-success: linear-gradient(135deg, hsl(152 69% 53%), hsl(142 69% 48%));
```

### Custom Utilities

```css
.pill                  /* Base pill style */
.pill-filter           /* Inactive filter pill */
.pill-filter-active    /* Active filter pill */
.gradient-primary      /* Purple gradient background */
.gradient-emergency    /* Emergency gradient background */
.shadow-card           /* Soft card shadow */
```

## 🧩 Key Components

### StatusBadge
Reusable status indicator with predefined types:
```tsx
<StatusBadge status="available" />
<StatusBadge status="low" />
<StatusBadge status="occupied" />
```

### Pill Filters
Interactive filter buttons matching the user app style:
```tsx
<button className={active ? "pill-filter-active" : "pill-filter"}>
  Filter Label
</button>
```

## 🔄 Next Steps for Integration

### 1. Real Authentication
Replace mock login with actual backend:
```typescript
// Currently in Login.tsx
const handleLogin = async (email, password) => {
  // Mock implementation
  // TODO: Replace with actual API call
};
```

### 2. WebSocket/Real-time Updates
Add Socket.io or Supabase Realtime for live data:
```typescript
// Example: Real-time ambulance tracking
useEffect(() => {
  const subscription = supabase
    .channel('ambulances')
    .on('postgres_changes', { 
      event: 'UPDATE', 
      schema: 'public', 
      table: 'ambulances' 
    }, payload => {
      updateAmbulanceLocation(payload.new);
    })
    .subscribe();
    
  return () => subscription.unsubscribe();
}, []);
```

### 3. Google Maps Integration
Replace mock map with actual Google Maps:
```typescript
import { GoogleMap, Marker } from '@react-google-maps/api';

// Add to Ambulances or dedicated Map page
<GoogleMap
  center={{ lat: hospital.lat, lng: hospital.lng }}
  zoom={13}
>
  {ambulances.map(amb => (
    <Marker 
      key={amb.id} 
      position={amb.location}
    />
  ))}
</GoogleMap>
```

### 4. API Integration Points

Create `src/lib/api.ts`:
```typescript
export const api = {
  // Emergency Requests
  getRequests: () => fetch('/api/requests').then(r => r.json()),
  acceptRequest: (id) => fetch(`/api/requests/${id}/accept`, { method: 'POST' }),
  
  // Beds
  updateBedStatus: (id, status) => 
    fetch(`/api/beds/${id}`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    }),
  
  // Blood Bank
  updateBloodStock: (type, units) =>
    fetch(`/api/blood/${type}`, {
      method: 'PATCH',
      body: JSON.stringify({ units })
    }),
    
  // Ambulances
  dispatchAmbulance: (id, requestId) =>
    fetch(`/api/ambulances/${id}/dispatch`, {
      method: 'POST',
      body: JSON.stringify({ requestId })
    }),
};
```

### 5. State Management

Install and configure Zustand for global state:
```bash
npm install zustand
```

```typescript
// src/store/hospitalStore.ts
import { create } from 'zustand';

export const useHospitalStore = create((set) => ({
  requests: [],
  beds: [],
  ambulances: [],
  setRequests: (requests) => set({ requests }),
  // ... more actions
}));
```

## 🎯 Matching User App Design

This hospital dashboard replicates key UI patterns from the user app:

✅ **Gradient headers** with title + subtitle  
✅ **Rounded-2xl cards** with soft shadows  
✅ **Pill-shaped filters** with active states  
✅ **Status badges** for availability  
✅ **Quick action tiles** in grid layout  
✅ **Bottom sticky CTAs** (Accept/Dispatch buttons)  
✅ **Map view** integration points  
✅ **Emergency red** for urgent items  
✅ **Smooth transitions** on all interactions  

## 📱 Responsive Breakpoints

- **Mobile**: 360px - 767px (bottom nav)
- **Tablet**: 768px - 1023px (sidebar + adjusted grid)
- **Desktop**: 1024px+ (full sidebar + multi-column grids)

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🎨 Customization

### Changing Theme Colors

Edit `src/index.css`:
```css
:root {
  --primary: 253 90% 64%;  /* Change to your brand color */
  /* ... */
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route to `src/App.tsx`
3. Add navigation item to `src/components/Sidebar.tsx` and `MobileNav.tsx`

## 📄 License

This project is part of the MedMap emergency medical platform.

## 🙏 Credits

- Design inspired by modern healthcare dashboards
- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
