import React from 'react';
import MiningCalculator from './components/MiningCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 relative calcumin-transparent">
      <div className="calcumin-watermark" aria-hidden="true" />
      <main className="container mx-auto px-4 py-8">
        <MiningCalculator />
      </main>
    </div>
  );
}

export default App