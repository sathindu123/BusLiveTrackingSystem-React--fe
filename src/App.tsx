
import React from 'react';
import { AuthProvider } from "./context/authContext";
import Router from "./routes/index";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
