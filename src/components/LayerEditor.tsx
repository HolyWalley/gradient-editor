import React from 'react';
import { GradientLayer } from '../types';

interface LayerEditorProps {
  layer: GradientLayer;
  onChange: (updated: GradientLayer) => void;
}

export function LayerEditor({ layer, onChange }: LayerEditorProps) {
  const updateLayer = (updatedProps: Partial<GradientLayer>) => {
    onChange({ ...layer, ...updatedProps });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Editing Layer {layer.id}</h3>

      <label>Colors:</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        {layer.colors.map((color, i) => (
          <input
            key={i}
            type="color"
            value={rgbaToHex(color)}
            onChange={(e) => {
              const newColors = [...layer.colors];
              newColors[i] = hexToRgba(e.target.value, getAlphaFromRgba(color));
              updateLayer({ colors: newColors });
            }}
            style={{ display: 'block' }}
          />
        ))}
      </div>

      <br />

      <button onClick={() => updateLayer({ colors: [...layer.colors, 'rgba(255,255,255,0.8)'] })}>
        Add Color Stop
      </button>

      <br />
      <br />

      <label>Opacity</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={layer.opacity}
        onChange={(e) => updateLayer({ opacity: parseFloat(e.target.value) })}
      />
      <br />
      <br />

      <label>Top Position: </label>
      <input
        type="range"
        value={layer.position.top.replace('%', '')}
        onChange={(e) => updateLayer({ position: { ...layer.position, top: `${e.target.value}%` } })}
      />

      <br />

      <label>Left Position: </label>
      <input
        type="range"
        value={layer.position.left.replace('%', '')}
        onChange={(e) => updateLayer({ position: { ...layer.position, left: `${e.target.value}%` } })}
      />

      <br />

      <label>Size: </label>
      <input
        type="range"
        value={layer.size.replace('%', '')}
        onChange={(e) => updateLayer({ size: `${e.target.value}%` })}
      />
      <br />

      <label>Blend Mode: </label>
      <select
        value={layer.blendMode}
        onChange={(e) => updateLayer({ blendMode: e.target.value })}
      >
        <option value="hard-light">hard-light</option>
        <option value="screen">screen</option>
        <option value="multiply">multiply</option>
        <option value="overlay">overlay</option>
      </select>
      <br />

      <label>Animation Type: </label>
      <select
        value={layer.animationType}
        onChange={(e) => updateLayer({ animationType: e.target.value as GradientLayer['animationType'] })}
      >
        <option value="none">None</option>
        <option value="moveInCircle">moveInCircle</option>
        <option value="moveVertical">moveVertical</option>
        <option value="moveHorizontal">moveHorizontal</option>
      </select>
      <br />

      <label>Animation Duration (s): </label>
      <input
        type="number"
        value={layer.animationDuration}
        onChange={(e) => updateLayer({ animationDuration: parseInt(e.target.value, 10) })}
      />
      <br />

      <label>Animation Timing Function: </label>
      <select
        value={layer.animationTimingFunction ?? 'ease'}
        onChange={(e) => updateLayer({ animationTimingFunction: e.target.value })}>
        <option value="ease">ease</option>
        <option value="linear">linear</option>
        <option value="ease-in">ease-in</option>
        <option value="ease-out">ease-out</option>
        <option value="ease-in-out">ease-in-out</option>
      </select>
      <br />

      <label>Transform Origin X: </label>
      <br />
      Base:
      <input
        type="range"
        value={layer.transformOrigin?.x?.base}
        min={0}
        max={100}
        onChange={(e) => updateLayer({
          transformOrigin: {
            x: { ...layer.transformOrigin?.x, base: e.target.value },
            y: layer.transformOrigin?.y ?? { base: 50, offset: 0 }
          }
        })}
      />
      <br />
      Offset:
      <input
        type="range"
        value={layer.transformOrigin?.x?.offset}
        min={-200}
        max={200}
        onChange={(e) => updateLayer({
          transformOrigin: {
            x: { ...layer.transformOrigin?.x, offset: e.target.value },
            y: layer.transformOrigin?.y ?? { base: 50, offset: 0 }
          }
        })}
      />
      <br />

      <label>Transform Origin Y: </label>
      <br />
      Base:
      <input
        type="range"
        value={layer.transformOrigin?.y?.base}
        min={0}
        max={100}
        onChange={(e) => updateLayer({
          transformOrigin: {
            y: { ...layer.transformOrigin?.y, base: e.target.value },
            x: layer.transformOrigin?.x ?? { base: 50, offset: 0 }
          }
        })}
      />
      <br />
      Offset:
      <input
        type="range"
        value={layer.transformOrigin?.y?.offset}
        min={-200}
        max={200}
        onChange={(e) => updateLayer({
          transformOrigin: {
            y: { ...layer.transformOrigin?.y, offset: e.target.value },
            x: layer.transformOrigin?.x ?? { base: 50, offset: 0 }
          }
        })}
      />
      <br />
    </div>
  );
}

// Helper functions for color conversion
function rgbaToHex(rgba: string) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d?.\d+)?\)/);
  if (!match) return '#000000';
  const [_, r, g, b] = match;
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

function getAlphaFromRgba(rgba: string) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d?.\d+)?\)/);
  if (!match) return 1;
  const alpha = match[4];
  return alpha ? parseFloat(alpha) : 1;
}
