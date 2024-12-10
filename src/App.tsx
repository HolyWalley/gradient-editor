import React, { useState } from 'react';
import { GradientConfig, GradientLayer } from './types';
import { Preview } from './components/Preview.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import './styles/animations.css';

export function App() {
  const [config, setConfig] = useState<GradientConfig>({
    backgroundColors: {
      from: 'rgba(108,0,162,1)',
      to: 'rgba(0,17,82,0.5)'
    },
    layers: []
  });

  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  const addLayer = () => {
    const newLayer: GradientLayer = {
      id: Date.now().toString(),
      colors: ['rgba(176,72,52,0.8)', 'rgba(176,72,52,0)'],
      opacity: 1,
      position: { top: '50%', left: '50%' },
      size: '80%',
      blendMode: 'hard-light',
      animationType: 'none',
      animationDuration: 30,
      transformOrigin: {
        x: { base: 50, offset: 0 },
        y: { base: 50, offset: 0 }
      },
      animationTimingFunction: 'ease'
    };
    setConfig((prev) => ({ ...prev, layers: [...prev.layers, newLayer] }));
    setSelectedLayerId(newLayer.id);
  };

  const updateLayer = (updatedLayer: GradientLayer) => {
    setConfig((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === updatedLayer.id ? updatedLayer : l))
    }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 1 50%', position: 'relative' }}>
        <Preview config={config} />
      </div>
      <div style={{ flex: '1 1 50%', padding: '20px', background: '#f0f0f0' }}>
        <Sidebar
          config={config}
          selectedLayerId={selectedLayerId}
          setSelectedLayerId={setSelectedLayerId}
          addLayer={addLayer}
          updateLayer={updateLayer}
          setConfig={setConfig}
        />
      </div>
    </div>
  );
}

export default App;
