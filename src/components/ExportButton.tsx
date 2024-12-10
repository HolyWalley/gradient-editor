import React from 'react';
import { GradientConfig } from '../types';

interface ExportButtonProps {
  config: GradientConfig;
}

export function ExportButton({ config }: ExportButtonProps) {
  const exportCSS = () => {
    const bg = `background: linear-gradient(40deg, ${config.backgroundColors.from}, ${config.backgroundColors.to});`;

    const layersCSS = config.layers.map((layer, i) => {
      const animation = layer.animationType !== 'none'
        ? `animation: ${layer.animationType} ${layer.animationDuration}s ${layer.animationTimingFunction ?? 'ease'} infinite;`
        : '';
      const gradientStr = `radial-gradient(circle at center, ${layer.colors.join(', ')})`;

      const transformOriginX = layer.transformOrigin?.x ?
        `calc(${layer.transformOrigin.x.base || 50}% + ${layer.transformOrigin.x.offset || 0}px)` : 'center'

      const transformOriginY = layer.transformOrigin?.y ?
        `calc(${layer.transformOrigin.y.base || 50}% + ${layer.transformOrigin.y.offset || 0}px)` : 'center'

      return `.preview > div:nth-of-type(${i + 1}) {
  position: absolute;
  top: calc(${layer.position.top} - ${layer.size}/2);
  left: calc(${layer.position.left} - ${layer.size}/2);
  width: ${layer.size};
  height: ${layer.size};
  mix-blend-mode: ${layer.blendMode};
  background: ${gradientStr};
  opacity: ${layer.opacity};
  transform-origin: ${transformOriginX} ${transformOriginY};
  ${animation}
}`;
    }).join('\n\n');

    const finalCSS = `
.preview {
  width: 500px;
  height: 500px;
  ${bg}
  position: relative;
  overflow: hidden;
}

@keyframes moveInCircle {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes moveVertical {
  0% { transform: translateY(-50%); }
  50% { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes moveHorizontal {
  0% { transform: translateX(-10%); }
  50% { transform: translateX(10%); }
  100% { transform: translateX(-10%); }
}

${layersCSS}
`;

    // Try copying to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(finalCSS).then(() => {
        alert('CSS copied to clipboard!');
      }).catch(() => {
        console.log(finalCSS);
        alert('CSS exported to console (clipboard not available)!');
      });
    } else {
      // Fallback if clipboard API is not supported
      console.log(finalCSS);
      alert('CSS exported to console (clipboard not supported)!');
    }
  };

  return <button onClick={exportCSS}>Export CSS</button>;
}

