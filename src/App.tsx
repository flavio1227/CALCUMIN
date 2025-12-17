import React from 'react';
import Header from './components/Header';
import MiningCalculator from './components/MiningCalculator';

function App() {
  return (
    <div className="min-h-screen bg-custom-blue">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MiningCalculator />
      </main>
    </div>
  );
}

export default App