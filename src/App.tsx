import React from 'react';
import Header from './components/Header';
import MiningCalculator from './components/MiningCalculator';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-custom-blue">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <MiningCalculator />
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App