import React from 'react';
import Header from './components/Header';
import MiningCalculator from './components/MiningCalculator';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <a
          href="https://flavio1227.github.io/SIGEM1.1/"
          className="fixed top-4 left-4 inline-block px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 z-50"
          title="Ir a SIGEM"
        >
          SIGEM
        </a>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <MiningCalculator />
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App