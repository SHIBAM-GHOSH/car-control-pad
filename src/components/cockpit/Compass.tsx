import React from 'react';

interface CompassProps {
  heading: number; // 0-360 degrees
}

const Compass: React.FC<CompassProps> = ({ heading }) => {
  const cardinalPoints = [
    { label: 'N', angle: 0 },
    { label: 'E', angle: 90 },
    { label: 'S', angle: 180 },
    { label: 'W', angle: 270 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[280px]">
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-secondary to-card border-4 border-border glow-primary">
        {/* Rotating compass rose */}
        <div 
          className="absolute inset-3 rounded-full bg-gradient-radial border border-border/50 transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${-heading}deg)` }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Degree markings */}
            {Array.from({ length: 72 }, (_, i) => {
              const angle = i * 5;
              const radians = ((angle - 90) * Math.PI) / 180;
              const isMajor = angle % 30 === 0;
              const isCardinal = angle % 90 === 0;
              const innerR = isMajor ? 38 : 41;
              const outerR = 44;
              const x1 = 50 + innerR * Math.cos(radians);
              const y1 = 50 + innerR * Math.sin(radians);
              const x2 = 50 + outerR * Math.cos(radians);
              const y2 = 50 + outerR * Math.sin(radians);
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isCardinal ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                  strokeWidth={isMajor ? "2" : "1"}
                  opacity={isMajor ? 1 : 0.5}
                />
              );
            })}
            
            {/* Degree numbers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
              const radians = ((angle - 90) * Math.PI) / 180;
              const labelR = 32;
              const labelX = 50 + labelR * Math.cos(radians);
              const labelY = 50 + labelR * Math.sin(radians);
              const cardinal = cardinalPoints.find(p => p.angle === angle);
              
              return (
                <text
                  key={angle}
                  x={labelX}
                  y={labelY}
                  fill={cardinal ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                  fontSize={cardinal ? "8" : "5"}
                  fontWeight={cardinal ? "bold" : "normal"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono"
                >
                  {cardinal ? cardinal.label : angle}
                </text>
              );
            })}
            
            {/* North arrow on rose */}
            <polygon
              points="50,15 47,25 50,22 53,25"
              fill="hsl(var(--destructive))"
              className="drop-shadow-[0_0_4px_hsl(var(--destructive))]"
            />
          </svg>
        </div>
        
        {/* Fixed heading indicator (lubber line) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-6 bg-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        
        {/* Center aircraft symbol */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_10px_hsl(var(--primary))]">
            <path
              d="M20 5 L20 15 M20 25 L20 35 M10 20 L17 20 M23 20 L30 20 M15 28 L20 25 L25 28"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="3" fill="hsl(var(--primary))" />
          </svg>
        </div>
        
        {/* Digital heading readout */}
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 bg-background/80 border border-border rounded px-3 py-1">
          <span className="font-mono text-lg font-bold text-primary">
            {heading.toFixed(0).padStart(3, '0')}
          </span>
          <span className="text-xs text-muted-foreground ml-1">°</span>
        </div>
      </div>
    </div>
  );
};

export default Compass;
