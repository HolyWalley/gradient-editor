// src/components/Sidebar.tsx
import React from 'react';
import { GradientConfig, GradientLayer } from '../types';
import { LayerEditor } from './LayerEditor.tsx';
import { ExportButton } from './ExportButton.tsx';

interface SidebarProps {
  config: GradientConfig;
  selectedLayerId: string | null;
  setSelectedLayerId: (id: string | null) => void;
  addLayer: () => void;
  updateLayer: (updatedLayer: GradientLayer) => void;
  setConfig: React.Dispatch<React.SetStateAction<GradientConfig>>;
}

export function Sidebar({
  config,
  selectedLayerId,
  setSelectedLayerId,
  addLayer,
  updateLayer,
  setConfig
}: SidebarProps) {
  const selectedLayer = config.layers.find((l) => l.id === selectedLayerId) || null;

  return (
    <div>
      <h2>Gradient Layers</h2>
      <button onClick={addLayer}>Add Gradient Layer</button>
      <ul>
        {config.layers.map((l) => (
          <li
            key={l.id}
            style={{
              cursor: 'pointer',
              fontWeight: l.id === selectedLayerId ? 'bold' : 'normal'
            }}
            onClick={() => setSelectedLayerId(l.id)}
          >
            Layer {l.id}
          </li>
        ))}
      </ul>

      {selectedLayer && (
        <LayerEditor layer={selectedLayer} onChange={updateLayer} />
      )}

      <h3>Background Colors</h3>
      <label>From</label>
      <input
        type="color"
        value={rgbaToHex(config.backgroundColors.from)}
        onChange={(e) =>
          setConfig((prev) => ({
            ...prev,
            backgroundColors: {
              ...prev.backgroundColors,
              from: hexToRgba(e.target.value)
            }
          }))
        }
      />

      <label>To</label>
      <input
        type="color"
        value={rgbaToHex(config.backgroundColors.to)}
        onChange={(e) =>
          setConfig((prev) => ({
            ...prev,
            backgroundColors: {
              ...prev.backgroundColors,
              to: hexToRgba(e.target.value)
            }
          }))
        }
      />

      <br />
      <br />
      <ExportButton config={config} />
    </div>
  );
}

// Helper functions to convert between rgba and hex for color input
function rgbaToHex(rgba: string) {
  // Basic conversion, assumes rgba(r,g,b,a) format
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d?.\d+)?\)/);
  if (!match) return '#000000';
  const [_, r, g, b] = match;
  // We ignore alpha for hex
  return '#' + [r, g, b].map(x => {
    const hex = parseInt(x, 10).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function hexToRgba(hex: string, alpha = 1) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
