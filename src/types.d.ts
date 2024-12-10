// src/types.d.ts
export interface GradientLayer {
  id: string;
  colors: string[]; // Array of colors in rgba or hex
  opacity: number;  // 0 to 1
  position: { top: string; left: string };
  size: string;      // e.g. "80%"
  blendMode: string; // e.g. "hard-light"
  animationType: 'moveInCircle' | 'moveVertical' | 'moveHorizontal' | 'none';
  animationDuration: number;
  transformOrigin?: {
    x: {
      base: number;
      offset: number;
    };
    y: {
      base: number;
      offset: number;
    };
  };
  animationTimingFunction: TimingFunction
}

export interface GradientConfig {
  backgroundColors: { from: string; to: string };
  layers: GradientLayer[];
}

export type TimingFunction = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
