import React from 'react'

/**
 *  Canvas
 */

export interface CanvasProps {
  width?: number;
  height?: number;
  pixelRatioAware?: boolean;
  draw?: (canvas: React.RefObject<HTMLCanvasElement>) => void;
}

export class Canvas extends React.Component<CanvasProps> {}
