// App.js
import React from 'react';
import { ExpoRoot } from 'expo-router';
import { AuthProvider } from './AuthContext'; // Ensure this path is correct

export default function App() {
  return (
    <AuthProvider>
      <ExpoRoot />
    </AuthProvider>
  );
}