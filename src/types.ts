export const UserRole = {
  GUEST: "GUEST",
  PASSENGER: "PASSENGER",
  DRIVER: "DRIVER",
  ADMIN: "ADMIN"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  busNumber?: string; // Specific for drivers
}

export type ViewState = 'LANDING' | 'LOGIN_DRIVER' | 'LOGIN_PASSENGER' | 'DASHBOARD_DRIVER' | 'DASHBOARD_PASSENGER';

export interface RouteInfo {
  id: string;
  start: string;
  end: string;
  distance: string;
}