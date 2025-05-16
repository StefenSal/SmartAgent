import type { COBEOptions } from "cobe";
import createGlobe from "cobe";
import type { MutableRefObject } from "react";
import React, { useEffect, useRef } from "react";

export default function Globe(): JSX.Element {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  const size = 700;
  useEffect(() => {
    if (!canvasRef.current) return;
    let phi = 0;
    let hue = 0;

    // Major cities coordinates
    const markers = [
      // North America
      { location: [37.7749, -122.4194] as [number, number], size: 0.05 }, // San Francisco
      { location: [40.7128, -74.0060] as [number, number], size: 0.08 }, // New York
      { location: [41.8781, -87.6298] as [number, number], size: 0.07 }, // Chicago
      { location: [34.0522, -118.2437] as [number, number], size: 0.06 }, // Los Angeles
      
      // Europe
      { location: [51.5074, -0.1278] as [number, number], size: 0.08 }, // London
      { location: [48.8566, 2.3522] as [number, number], size: 0.07 }, // Paris
      { location: [52.5200, 13.4050] as [number, number], size: 0.06 }, // Berlin
      
      // Asia
      { location: [35.6762, 139.6503] as [number, number], size: 0.08 }, // Tokyo
      { location: [22.3193, 114.1694] as [number, number], size: 0.07 }, // Hong Kong
      { location: [28.6139, 77.2090] as [number, number], size: 0.06 }, // New Delhi
      { location: [39.9042, 116.4074] as [number, number], size: 0.08 }, // Beijing
      
      // Australia
      { location: [-33.8688, 151.2093] as [number, number], size: 0.06 }, // Sydney
    ];

    const globeSettings: COBEOptions = {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 8,
      baseColor: [0.8, 0.8, 0.9],
      markerColor: [0.5, 0.3, 0.9],
      glowColor: [0.6, 0.6, 0.9],
      markers,
      onRender: (state) => {
        // Dynamic rotation speed
        state.phi = phi;
        phi += 0.0015;
        
        // Slowly change colors over time for a dynamic effect
        hue += 0.001;
        if (hue >= 1) hue = 0;
        
        // Convert HSV to RGB (simplified version)
        const h = hue;
        const s = 0.3;  // Lower saturation for more subtle colors
        const v = 0.9;
        
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        
        let r, g, b;
        switch (i % 6) {
          case 0: r = v; g = t; b = p; break;
          case 1: r = q; g = v; b = p; break;
          case 2: r = p; g = v; b = t; break;
          case 3: r = p; g = q; b = v; break;
          case 4: r = t; g = p; b = v; break;
          case 5: r = v; g = p; b = q; break;
        }
        
        // Update glow color based on the generated RGB values
        state.glowColor = [r, g, b];
      },
    };

    const globe = createGlobe(canvasRef.current, globeSettings);

    return () => {
      if (canvasRef.current && globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300/20 via-pink-300/10 to-blue-300/20 blur-xl animate-pulse-slow" />
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: size, 
          height: size, 
          aspectRatio: "1",
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))"
        }} 
      />
    </div>
  );
}
