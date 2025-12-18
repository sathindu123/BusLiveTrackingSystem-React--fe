export enum UserRole {
  GUEST = 'GUEST',
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  busNumber?: string;
}

export interface RouteInfo {
  id: string;
  name: string;
}