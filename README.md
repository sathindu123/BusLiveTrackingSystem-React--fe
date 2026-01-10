# 🚍 LankaBus Live - Frontend (React.js)

Technical documentation for the frontend of the Sri Lankan Bus Live Tracking System.

## 🌟 Main Features

### 👨‍🎓 1. Passenger Panel
- **Route Selection:** Search for buses by route (e.g., Kaduwela → Pettah).
- **Real-time Map:** View live movement of buses on an interactive map.
- **ETA Estimation:** Get real-time updates on estimated time of arrival and distance.
- **Bus Details:** View specific bus numbers, current speeds, and operational status.

### 👨‍💻 2. Driver Panel
- **Driver Login:** Secure authentication for bus drivers.
- **Trip Management:** Dedicated 'Start Trip' and 'End Trip' controls.
- **GPS Sharing:** Real-time location broadcasting using the HTML Geolocation API.
- **Status Toggle:** Easy management of Online/Offline status.

## 🛠 Technologies Used
- **Framework:** React.js (ESM based)
- **Styling:** Tailwind CSS (Modern & Responsive UI)
- **Maps:** Leaflet.js (Open-source interactive maps)
- **Real-time Data:** Socket.io-client
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect)

## 📁 Folder Structure
```text
/src
 ├── components/
 │    ├── googlemap.tsx          
 │    ├── header.tsx      
 │    ├── layout.tsx  
 │    └── navbar.tsx 
 ├── types.ts                  # TypeScript Interfaces
 ├── App.tsx                   # Main Entry & Role Management
 └── index.tsx                 # Root Rendering
```

## 🚀 Getting Started (Setup Instructions)
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 UI Design Philosophy
- **Map-Centric:** Clear visualization of bus markers on a high-contrast map.
- **Fully Responsive:** Optimized for both mobile and desktop views.
- **Live Feedback:** Pulse animations and status badges to indicate real-time connectivity.
