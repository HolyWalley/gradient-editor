import React from 'react';
import { GradientConfig } from '../types';

interface PreviewProps {
  config: GradientConfig;
}

type MixBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'hard-light';

export function Preview({ config }: PreviewProps) {
  return (
    <div
      className="preview"
      style={{
        background: `linear-gradient(40deg, ${config.backgroundColors.from}, ${config.backgroundColors.to})`,
        resize: 'both'
      }}
    >
      {config.layers.map((layer) => {
        let animationName: string;
        switch (layer.animationType) {
          case 'moveInCircle':
            animationName = 'moveInCircle';
            break;
          case 'moveVertical':
            animationName = 'moveVertical';
            break;
          case 'moveHorizontal':
            animationName = 'moveHorizontal';
            break;
          default:
            animationName = 'none';
        }

        // Build a radial gradient from the colors array. If more than two colors, join them properly.
        // For simplicity, assume first is the main color and second is the transparent fade-out.
        const gradientStr = layer.colors.length === 2
          ? `radial-gradient(circle at center, ${layer.colors[0]}, ${layer.colors[1]} 50%)`
          : `radial-gradient(circle at center, ${layer.colors.join(', ')})`;

        const transformOriginX = layer.transformOrigin?.x ?
          `calc(${layer.transformOrigin.x.base || 50}% + ${layer.transformOrigin.x.offset || 0}px)` : 'center'

        const transformOriginY = layer.transformOrigin?.y ?
          `calc(${layer.transformOrigin.y.base || 50}% + ${layer.transformOrigin.y.offset || 0}px)` : 'center'

        return (
          <div
            key={layer.id}
            style={{
              position: 'absolute',
              top: `calc(${layer.position.top} - ${layer.size}/2)`,
              left: `calc(${layer.position.left} - ${layer.size}/2)`,
              width: layer.size,
              height: layer.size,
              mixBlendMode: layer.blendMode as MixBlendMode,
              background: gradientStr,
              animation: animationName !== 'none' ? `${animationName} ${layer.animationDuration}s ${layer.animationTimingFunction ?? 'ease'} infinite` : 'none',
              opacity: layer.opacity,
              transformOrigin: `${transformOriginX} ${transformOriginY}`
            }}
          />
        );
      })}
    </div>
  );
}
